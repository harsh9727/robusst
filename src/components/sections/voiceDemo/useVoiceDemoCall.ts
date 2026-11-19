"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RemoteTrack, Room } from "livekit-client";
import type { VoiceDemoData } from "./types";

/*
 * Live voice demo service. Calls are started by the partner demo API. The
 * partner key is public: it only says which partner page the call came from.
 * The microphone is requested only after the visitor taps.
 */
const DEMO_API = "https://ravanaienterprises.com/api/embed";
const PARTNER_KEY = "rbst_8hq3qerjwxlx";

export type VoiceCallState = "idle" | "connecting" | "connected";

type CallTiming = { id: string; liveAt: number };

type StartResponse = {
  success?: boolean;
  message?: string;
  call_id?: string;
  response?: { url?: string; token?: string };
};

function currentPage() {
  return /^https?:$/.test(location.protocol)
    ? (location.origin + location.pathname).slice(0, 160)
    : "local file";
}

function post(action: string, payload: Record<string, unknown>) {
  // text/plain keeps this a simple cross-origin request with no preflight.
  return fetch(`${DEMO_API}?a=${action}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(payload),
  });
}

export function useVoiceDemoCall(copy: VoiceDemoData["demo"]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<VoiceCallState>("idle");
  const [status, setStatus] = useState("");
  const [audioActive, setAudioActive] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  const roomRef = useRef<Room | null>(null);
  const stateRef = useRef<VoiceCallState>("idle");
  const callRef = useRef<CallTiming | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  const audioElementsRef = useRef<HTMLMediaElement[]>([]);
  const statusTimerRef = useRef<number | null>(null);

  const updateState = useCallback((next: VoiceCallState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  /** Sends the call length once, even if the page is closing. */
  const report = useCallback(() => {
    const call = callRef.current;
    if (!call) return;
    callRef.current = null;
    const seconds = call.liveAt
      ? Math.round((Date.now() - call.liveAt) / 1000)
      : 0;
    const body = JSON.stringify({
      k: PARTNER_KEY,
      call_id: call.id,
      seconds,
      page: currentPage(),
    });
    try {
      if (
        navigator.sendBeacon?.(
          `${DEMO_API}?a=end`,
          new Blob([body], { type: "text/plain" }),
        )
      )
        return;
    } catch {
      // Fall through to fetch.
    }
    void fetch(`${DEMO_API}?a=end`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  const stopVisualizer = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    void audioCtxRef.current?.close().catch(() => undefined);
    audioCtxRef.current = null;
    setAudioActive(false);
  }, []);

  /** Draws the blue frequency ring around the orb while the agent speaks. */
  const startVisualizer = useCallback((track: MediaStreamTrack) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    try {
      const AudioContextClass =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(new MediaStream([track]));
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      const bins = new Uint8Array(analyser.frequencyBinCount);
      const size = 234;
      canvas.width = size;
      canvas.height = size;
      setAudioActive(true);
      const draw = () => {
        frameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(bins);
        context.clearRect(0, 0, size, size);
        const center = size / 2;
        const radius = size / 2 - 10;
        for (let index = 0; index < bins.length; index++) {
          const angle = (index / bins.length) * Math.PI * 2 - Math.PI / 2;
          const level = (bins[index] ?? 0) / 255;
          const length = level * 18 + 2;
          context.beginPath();
          context.moveTo(
            center + Math.cos(angle) * radius,
            center + Math.sin(angle) * radius,
          );
          context.lineTo(
            center + Math.cos(angle) * (radius + length),
            center + Math.sin(angle) * (radius + length),
          );
          context.strokeStyle = `rgba(76, 157, 255, ${0.35 + level * 0.4})`;
          context.lineWidth = 2;
          context.lineCap = "round";
          context.stroke();
        }
      };
      draw();
    } catch (error) {
      console.warn("Audio visualizer error:", error);
    }
  }, []);

  const disconnect = useCallback(() => {
    report();
    const room = roomRef.current;
    roomRef.current = null;
    if (room) void room.disconnect().catch(() => undefined);
    stopVisualizer();
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
      video.removeAttribute("src");
      video.load();
    }
    setVideoActive(false);
    for (const element of audioElementsRef.current) element.remove();
    audioElementsRef.current = [];
    updateState("idle");
    setStatus("");
  }, [report, stopVisualizer, updateState]);

  const showError = useCallback((message: string) => {
    setStatus(message);
    if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
    statusTimerRef.current = window.setTimeout(() => {
      if (stateRef.current === "idle") setStatus("");
    }, 5000);
  }, []);

  const connect = useCallback(async () => {
    if (stateRef.current !== "idle") return;
    if (!window.isSecureContext || !navigator.mediaDevices) {
      setStatus(copy.errorNeedsHttps ?? "");
      return;
    }
    updateState("connecting");
    setStatus(copy.statusStarting ?? "");

    try {
      let LivekitClient: typeof import("livekit-client");
      try {
        LivekitClient = await import("livekit-client");
      } catch {
        throw new Error(copy.errorLibrary ?? "");
      }
      report();

      let response: Response;
      let data: StartResponse | null;
      try {
        response = await post("start", {
          k: PARTNER_KEY,
          page: currentPage(),
        });
        data = (await response.json()) as StartResponse | null;
      } catch {
        throw new Error(copy.errorUnreachable ?? "");
      }
      if (response.status === 429)
        throw new Error(data?.message ?? copy.errorBusy ?? "");
      const url = data?.response?.url;
      const token = data?.response?.token;
      if (!response.ok || !data?.success || !url || !token) {
        // The service's own reason helps with support; visitors see the
        // localized message.
        console.warn(
          `Voice demo service refused the call (HTTP ${response.status}):`,
          data?.message ?? "no message",
        );
        throw new Error(copy.errorFailed ?? "");
      }

      callRef.current = { id: data.call_id ?? "", liveAt: 0 };
      setStatus(copy.statusConnecting ?? "");

      const room = new LivekitClient.Room({
        adaptiveStream: true,
        dynacast: true,
      });
      roomRef.current = room;
      room.on(LivekitClient.RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        if (track.kind === LivekitClient.Track.Kind.Video && videoRef.current) {
          track.attach(videoRef.current);
          videoRef.current.muted = false;
          setVideoActive(true);
        }
        if (track.kind === LivekitClient.Track.Kind.Audio) {
          const element = track.attach();
          document.body.appendChild(element);
          audioElementsRef.current.push(element);
          startVisualizer(track.mediaStreamTrack);
        }
      });
      room.on(
        LivekitClient.RoomEvent.TrackUnsubscribed,
        (track: RemoteTrack) => {
          for (const element of track.detach()) element.remove();
        },
      );
      room.on(LivekitClient.RoomEvent.Disconnected, () => {
        if (roomRef.current === room) disconnect();
      });
      room.on(LivekitClient.RoomEvent.ParticipantConnected, () =>
        setStatus(""),
      );

      await room.connect(url, token);

      let microphoneBlocked = false;
      try {
        await room.localParticipant.setMicrophoneEnabled(true);
      } catch (error) {
        console.warn("Microphone access denied:", error);
        microphoneBlocked = true;
        setStatus(copy.errorMicrophone ?? "");
      }

      // Until the agent sends its own video, play the idle agent animation.
      const video = videoRef.current;
      if (video && copy.videoUrl) {
        video.src = copy.videoUrl;
        video.muted = true;
        void video.play().catch(() => undefined);
        setVideoActive(true);
      }

      if (callRef.current && !callRef.current.liveAt)
        callRef.current.liveAt = Date.now();
      updateState("connected");
      if (!microphoneBlocked) setStatus("");
    } catch (error) {
      // A refused or failed call is expected (for example, the demo service is
      // down). The card shows the localized message, so warn instead of error.
      console.warn(
        "Voice demo call failed:",
        error instanceof Error ? error.message : error,
      );
      const room = roomRef.current;
      roomRef.current = null;
      if (room) void room.disconnect().catch(() => undefined);
      report();
      updateState("idle");
      showError(
        error instanceof Error && error.message
          ? error.message
          : (copy.errorFailed ?? ""),
      );
    }
  }, [copy, disconnect, report, showError, startVisualizer, updateState]);

  // Report the call length when the visitor leaves, and clean up on unmount.
  useEffect(() => {
    window.addEventListener("pagehide", report);
    return () => {
      window.removeEventListener("pagehide", report);
      if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
      if (roomRef.current) disconnect();
    };
  }, [disconnect, report]);

  // Keep the idle agent video looping on its last frames, as in the original.
  useEffect(() => {
    const video = videoRef.current;
    const videoUrl = copy.videoUrl;
    if (!video || !videoUrl) return;
    const onTimeUpdate = () => {
      if (
        video.currentSrc.includes(videoUrl) &&
        video.currentTime > video.duration - 0.2
      ) {
        video.currentTime = Math.max(0, video.duration - 0.5);
        void video.play().catch(() => undefined);
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [copy.videoUrl]);

  return {
    videoRef,
    canvasRef,
    state,
    status,
    audioActive,
    videoActive,
    connect,
    disconnect,
  };
}

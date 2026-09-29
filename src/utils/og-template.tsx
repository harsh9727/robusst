/**
 * Shared JSX template for all Robusst Open Graph images.
 * Used by /api/og route and every opengraph-image.tsx segment file.
 * Must use only inline styles – no Tailwind, no CSS modules.
 */

export function buildOgImageJsx(
  title: string,
  description: string,
  brandName: string,
  badgeLabel: string,
  websiteDisplayUrl: string,
) {
  const truncatedDesc =
    description.length > 120 ? description.slice(0, 120) + "…" : description;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        background:
          "linear-gradient(135deg, #0c1323 0%, #1a2a45 60%, #0f2040 100%)",
        padding: "60px 72px",
        position: "relative",
        fontFamily: "DejaVu Sans",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "6px",
          background: "linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)",
        }}
      />

      {/* Grid watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Brand – top right */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "72px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            color: "#93c5fd",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </div>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#3b82f6",
          }}
        />
      </div>

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "24px",
          background: "rgba(59,130,246,0.15)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: "100px",
          padding: "6px 18px",
        }}
      >
        <div
          style={{
            color: "#93c5fd",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {badgeLabel}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          color: "#ffffff",
          fontSize: title.length > 60 ? "42px" : "52px",
          fontWeight: 700,
          lineHeight: 1.2,
          maxWidth: "900px",
          marginBottom: "20px",
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "22px",
          lineHeight: 1.5,
          maxWidth: "820px",
          marginBottom: "40px",
        }}
      >
        {truncatedDesc}
      </div>

      {/* Bottom bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "3px",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
            borderRadius: "2px",
          }}
        />
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
          {websiteDisplayUrl}
        </div>
      </div>
    </div>
  );
}

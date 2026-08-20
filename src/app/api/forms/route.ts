import { createClient } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { locales } from "~/i18n/config";

const phonePattern = /^\+?[0-9()\s.-]{7,30}$/;

const submissionSchema = z
  .object({
    reason: z.enum(["CONTACT", "POC", "PARTNER"]),
    locale: z
      .string()
      .refine((value) => (locales as readonly string[]).includes(value)),
    name: z.string().trim().min(2).max(150),
    email: z.string().trim().toLowerCase().email().max(320),
    phone: z
      .string()
      .trim()
      .max(50)
      .refine((value) => !value || phonePattern.test(value), {
        message: "Invalid phone number.",
      })
      .optional()
      .default(""),
    companyName: z.string().trim().max(200).optional().default(""),
    country: z.string().trim().max(120).optional().default(""),
    message: z.string().trim().max(5000).optional().default(""),
    job: z.string().trim().max(200).optional().default(""),
    companyWebsite: z.string().trim().max(500).optional().default(""),
    partnerType: z.enum(["sales", "tech"]).optional(),
  })
  .superRefine((submission, context) => {
    if (submission.reason === "PARTNER") {
      if (!submission.partnerType) {
        context.addIssue({
          code: "custom",
          path: ["partnerType"],
          message: "Partner type is required.",
        });
      }
      return;
    }

    if (!submission.country) {
      context.addIssue({
        code: "custom",
        path: ["country"],
        message: "Country is required.",
      });
    }
    if (!submission.message) {
      context.addIssue({
        code: "custom",
        path: ["message"],
        message: "Message is required.",
      });
    }
  });

function sourcePath(request: NextRequest) {
  const referer = request.headers.get("referer");
  if (!referer) return undefined;
  try {
    const url = new URL(referer);
    return url.host === request.nextUrl.host
      ? `${url.pathname}${url.search}`
      : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  const token = process.env.SANITY_FORM_SUBMISSION_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!token || !projectId || !dataset) {
    console.error("[forms] Missing Sanity submission configuration");
    return NextResponse.json(
      {
        success: false,
        message: "Server misconfigured. Please try again later.",
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid form submission.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const submission = parsed.data;
  const submissionType = submission.reason.toLowerCase();
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-08-15",
    token,
    useCdn: false,
  });

  try {
    // Treat rapid retries of the same form/email as successful without creating
    // duplicate CRM records.
    const cutoff = new Date(Date.now() - 30_000).toISOString();
    const duplicate = await client.fetch<number>(
      `count(*[
        _type == "formSubmission" &&
        submissionType == $submissionType &&
        email == $email &&
        dateTime(_createdAt) > dateTime($cutoff)
      ])`,
      { submissionType, email: submission.email, cutoff },
    );

    if (duplicate > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Your submission has already been received.",
          duplicate: true,
        },
        { status: 201 },
      );
    }

    await client.create({
      _type: "formSubmission",
      submissionType,
      submittedAt: new Date().toISOString(),
      locale: submission.locale,
      sourcePath: sourcePath(request),
      name: submission.name,
      email: submission.email,
      phone: submission.phone || undefined,
      companyName: submission.companyName || undefined,
      country: submission.country || undefined,
      message: submission.message || undefined,
      jobTitle: submission.job || undefined,
      companyWebsite: submission.companyWebsite || undefined,
      partnerType: submission.partnerType,
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your submission has been received successfully. We will get back to you soon.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[forms] Failed to save form submission to Sanity", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please try again later.",
      },
      { status: 500 },
    );
  }
}

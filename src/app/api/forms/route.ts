import { createClient } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { locales } from "~/i18n/config";
import {
  emailDeliveryError,
  sendSubmissionEmails,
  type FormEmailTemplate,
} from "~/server/form-email";

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

const emailTemplateSchema: z.ZodType<FormEmailTemplate> = z.object({
  userSubject: z.string().min(1),
  userHeading: z.string().min(1),
  userMessage: z.string().min(1),
  userClosing: z.string().min(1),
  internalSubject: z.string().min(1),
});

const emailSettingsSchema = z.object({
  siteName: z.string().min(1),
  contactEmail: z.string().email(),
  contactFormEmail: emailTemplateSchema,
  pocFormEmail: emailTemplateSchema,
  partnerFormEmail: emailTemplateSchema,
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

function templateForReason(
  reason: z.infer<typeof submissionSchema>["reason"],
  settings: z.infer<typeof emailSettingsSchema>,
) {
  if (reason === "POC") return settings.pocFormEmail;
  if (reason === "PARTNER") return settings.partnerFormEmail;
  return settings.contactFormEmail;
}

export async function POST(request: NextRequest) {
  const token = process.env.SANITY_FORM_SUBMISSION_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!token || !projectId || !dataset || !resendApiKey) {
    console.error("[forms] Missing Sanity or Resend submission configuration");
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
    perspective: "published",
  });

  try {
    const rawSettings = await client.fetch(
      `*[_type == "siteSettings" && language == $locale][0]{
        siteName,
        contactEmail,
        contactFormEmail,
        pocFormEmail,
        partnerFormEmail
      }`,
      { locale: submission.locale },
    );
    const settingsResult = emailSettingsSchema.safeParse(rawSettings);
    if (!settingsResult.success) {
      console.error(
        "[forms] Missing localized CMS email configuration",
        settingsResult.error.flatten(),
      );
      return NextResponse.json(
        {
          success: false,
          message: "Email notifications are not configured.",
        },
        { status: 500 },
      );
    }
    const settings = settingsResult.data;
    const submittedAt = new Date().toISOString();
    const requestSourcePath = sourcePath(request);

    // A retry within 30 seconds reuses the same Sanity document and Resend
    // idempotency keys. This safely retries failed mail without creating a
    // duplicate lead or sending duplicate messages.
    const cutoff = new Date(Date.now() - 30_000).toISOString();
    const duplicate = await client.fetch<{
      _id: string;
      submittedAt: string;
      sourcePath?: string;
    } | null>(
      `*[
        _type == "formSubmission" &&
        submissionType == $submissionType &&
        email == $email &&
        dateTime(_createdAt) > dateTime($cutoff)
      ] | order(_createdAt desc)[0]{_id, submittedAt, sourcePath}`,
      { submissionType, email: submission.email, cutoff },
    );

    const document =
      duplicate ??
      (await client.create({
        _type: "formSubmission",
        submissionType,
        submittedAt,
        locale: submission.locale,
        sourcePath: requestSourcePath,
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
        notificationEmailStatus: "pending",
        confirmationEmailStatus: "pending",
      }));

    const delivery = await sendSubmissionEmails({
      apiKey: resendApiKey,
      submissionId: document._id,
      submittedAt: document.submittedAt ?? submittedAt,
      sourcePath: document.sourcePath ?? requestSourcePath,
      submission,
      settings: {
        siteName: settings.siteName,
        contactEmail: settings.contactEmail,
        template: templateForReason(submission.reason, settings),
      },
    });
    const deliveryError = emailDeliveryError(delivery);
    const patch = client.patch(document._id).set({
      notificationEmailStatus:
        delivery.notification.status === "fulfilled" ? "sent" : "failed",
      confirmationEmailStatus:
        delivery.confirmation.status === "fulfilled" ? "sent" : "failed",
      emailLastAttemptAt: new Date().toISOString(),
    });
    if (deliveryError) patch.set({ emailDeliveryError: deliveryError });
    else patch.unset(["emailDeliveryError"]);
    await patch.commit();

    if (deliveryError) {
      console.error("[forms] Email delivery failed", deliveryError);
      return NextResponse.json(
        {
          success: false,
          saved: true,
          message:
            "Your submission was saved, but we could not send the email confirmation. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        duplicate: Boolean(duplicate),
        message:
          "Your submission has been received successfully. A confirmation email has been sent.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[forms] Failed to process form submission", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please try again later.",
      },
      { status: 500 },
    );
  }
}

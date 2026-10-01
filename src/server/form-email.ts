import "server-only";

export type SubmissionReason = "CONTACT" | "POC" | "PARTNER";

export interface FormSubmissionData {
  reason: SubmissionReason;
  locale: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  message: string;
  job: string;
  companyWebsite: string;
  partnerType?: "sales" | "tech";
}

export interface FormEmailTemplate {
  userSubject: string;
  userHeading: string;
  userMessage: string;
  userClosing: string;
  internalSubject: string;
}

export interface FormEmailSettings {
  siteName: string;
  contactEmail: string;
  template: FormEmailTemplate;
}

interface SendSubmissionEmailsOptions {
  apiKey: string;
  submissionId: string;
  submittedAt: string;
  sourcePath?: string;
  submission: FormSubmissionData;
  settings: FormEmailSettings;
}

export interface EmailDeliveryResult {
  notification: PromiseSettledResult<string>;
  confirmation: PromiseSettledResult<string>;
}

const fieldLabels: Record<keyof FormSubmissionData, string> = {
  reason: "Form",
  locale: "Website language",
  name: "Name",
  email: "Email",
  phone: "Phone",
  companyName: "Company",
  country: "Country",
  message: "Message",
  job: "Job title",
  companyWebsite: "Company website",
  partnerType: "Partner type",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function interpolate(value: string, variables: Record<string, string>) {
  return value.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    Object.hasOwn(variables, key) ? variables[key]! : match,
  );
}

function paragraph(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function emailShell({
  lang,
  direction,
  siteName,
  heading,
  body,
}: {
  lang: string;
  direction: "ltr" | "rtl";
  siteName: string;
  heading: string;
  body: string;
}) {
  return `<!doctype html>
<html lang="${escapeHtml(lang)}" dir="${direction}">
  <body style="margin:0;background:#f4f7fb;color:#111827;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr><td style="height:6px;background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6);"></td></tr>
          <tr><td style="padding:32px;">
            <div style="font-size:18px;font-weight:700;color:#1677c8;margin-bottom:24px;">${escapeHtml(siteName)}</div>
            <h1 style="font-size:26px;line-height:1.25;margin:0 0 20px;color:#111827;">${escapeHtml(heading)}</h1>
            ${body}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

async function sendResendEmail({
  apiKey,
  idempotencyKey,
  from,
  to,
  replyTo,
  subject,
  html,
}: {
  apiKey: string;
  idempotencyKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
    }),
  });
  const result = (await response.json().catch(() => null)) as {
    id?: string;
    message?: string;
  } | null;
  if (!response.ok || !result?.id) {
    throw new Error(
      result?.message ?? `Resend request failed with status ${response.status}`,
    );
  }
  return result.id;
}

export async function sendSubmissionEmails({
  apiKey,
  submissionId,
  submittedAt,
  sourcePath,
  submission,
  settings,
}: SendSubmissionEmailsOptions): Promise<EmailDeliveryResult> {
  const variables = {
    name: submission.name,
    siteName: settings.siteName,
  };
  const sender = `${settings.siteName} <${settings.contactEmail}>`;
  const direction = submission.locale === "ar" ? "rtl" : "ltr";
  const userHeading = interpolate(settings.template.userHeading, variables);
  const userBody = `
    <p style="font-size:16px;line-height:1.7;margin:0 0 20px;color:#374151;">${paragraph(interpolate(settings.template.userMessage, variables))}</p>
    <p style="font-size:16px;line-height:1.7;margin:0;color:#374151;">${paragraph(interpolate(settings.template.userClosing, variables))}</p>`;

  const detailRows = (
    Object.entries(submission) as Array<
      [keyof FormSubmissionData, string | undefined]
    >
  )
    .filter(([, value]) => value)
    .map(
      ([field, value]) => `<tr>
        <td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;vertical-align:top;width:170px;">${escapeHtml(fieldLabels[field])}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value ?? "")}</td>
      </tr>`,
    )
    .join("");
  const metadataRows = `
    <tr><td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;">Submitted at</td><td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(submittedAt)}</td></tr>
    <tr><td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;">Source page</td><td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(sourcePath ?? "Unknown")}</td></tr>`;
  const internalBody = `<p style="font-size:16px;line-height:1.6;color:#374151;">A new website form submission has been saved in Sanity.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;border-collapse:collapse;font-size:14px;">${detailRows}${metadataRows}</table>`;

  const [notification, confirmation] = await Promise.allSettled([
    sendResendEmail({
      apiKey,
      idempotencyKey: `form/${submissionId}/notification`,
      from: sender,
      to: settings.contactEmail,
      replyTo: submission.email,
      subject: interpolate(settings.template.internalSubject, variables),
      html: emailShell({
        lang: "en",
        direction: "ltr",
        siteName: settings.siteName,
        heading: interpolate(settings.template.internalSubject, variables),
        body: internalBody,
      }),
    }),
    sendResendEmail({
      apiKey,
      idempotencyKey: `form/${submissionId}/confirmation`,
      from: sender,
      to: submission.email,
      replyTo: settings.contactEmail,
      subject: interpolate(settings.template.userSubject, variables),
      html: emailShell({
        lang: submission.locale,
        direction,
        siteName: settings.siteName,
        heading: userHeading,
        body: userBody,
      }),
    }),
  ]);

  return { notification, confirmation };
}

export function emailDeliveryError(result: EmailDeliveryResult) {
  return Object.entries(result)
    .filter(([, delivery]) => delivery.status === "rejected")
    .map(([name, delivery]) => {
      const reason = (delivery as PromiseRejectedResult).reason;
      return `${name}: ${reason instanceof Error ? reason.message : String(reason)}`;
    })
    .join("\n")
    .slice(0, 2000);
}

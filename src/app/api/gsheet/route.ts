import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const SHEET_NAME = "contact_and_poc_waitlist";
const PARTNER_SHEET_NAME = "partner_form";

// Helper function to format date as "05 June, 2025"
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// Helper function to format time as "05:00 PM" / "12:00 Noon" / "10:30 AM"
function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Check if it's exactly noon
  if (hours === 12 && minutes === 0) {
    return "12:00 Noon";
  }

  // Format as regular time
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return time;
}

// Helper function to add contact/poc data to Google Sheets
async function addToGoogleSheets(
  reason: "CONTACT" | "POC",
  name: string,
  companyName: string,
  email: string,
  phone: string,
  message: string,
) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get current date and time in IST
    const now = new Date();
    const dateFormatted = formatDate(now);
    const timeFormatted = formatTime(now);

    // Fields in order: date, time_IST, reason, name, company name, email, phone, what are you looking for
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`, // Columns A to H
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            dateFormatted,
            timeFormatted,
            reason,
            name,
            companyName,
            email,
            phone,
            message,
          ],
        ],
      },
    });

    return true;
  } catch (error) {
    console.error(
      "[ERROR] [SPREADSHEET] Failed to add to Google Sheets:",
      error,
    );
    throw error;
  }
}

// Helper function to add partner form data to Google Sheets
async function addPartnerToGoogleSheets(
  name: string,
  job: string,
  email: string,
  phone: string,
  companyName: string,
  companyWebsite: string,
  partnerType: string,
) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get current date and time in IST
    const now = new Date();
    const dateFormatted = formatDate(now);
    const timeFormatted = formatTime(now);

    // Fields in order: date, time_IST, name, job, email, phone, company name, company website, partner type
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${PARTNER_SHEET_NAME}!A:I`, // Columns A to I
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            dateFormatted,
            timeFormatted,
            name,
            job,
            email,
            phone,
            companyName,
            companyWebsite,
            partnerType,
          ],
        ],
      },
    });

    return true;
  } catch (error) {
    console.error(
      "[ERROR] [SPREADSHEET] Failed to add partner to Google Sheets:",
      error,
    );
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check configuration
    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error("[CONFIG] Missing Google Sheets configuration");
      return NextResponse.json(
        {
          success: false,
          message: "Server misconfigured. Please try again later.",
        },
        { status: 500 },
      );
    }

    // Parse request body
    const body = await request.json();
    const { reason } = body;

    // Validate reason first
    if (!reason) {
      return NextResponse.json(
        { success: false, message: "Reason is required." },
        { status: 400 },
      );
    }

    // ── PARTNER form ──────────────────────────────────────────────────────────
    if (reason === "PARTNER") {
      const {
        name,
        job,
        email,
        phone,
        companyName,
        companyWebsite,
        partnerType,
      } = body;

      // Validate required fields
      if (!name || !email || !partnerType) {
        return NextResponse.json(
          {
            success: false,
            message: "Name, email, and partner type are required.",
          },
          { status: 400 },
        );
      }

      // Validate partner type
      if (partnerType !== "sales" && partnerType !== "tech") {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid partner type. Must be either 'sales' or 'tech'.",
          },
          { status: 400 },
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, message: "Invalid email format." },
          { status: 400 },
        );
      }

      // Validate phone if provided
      if (phone) {
        const phoneRegex =
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(phone)) {
          return NextResponse.json(
            { success: false, message: "Invalid phone number format." },
            { status: 400 },
          );
        }
      }

      try {
        await addPartnerToGoogleSheets(
          name.trim(),
          job?.trim() || "",
          email.trim().toLowerCase(),
          phone?.trim() || "",
          companyName?.trim() || "",
          companyWebsite?.trim() || "",
          partnerType,
        );

        return NextResponse.json(
          {
            success: true,
            message:
              "Your partner request has been submitted successfully! We will get back to you soon.",
          },
          { status: 201 },
        );
      } catch (sheetError) {
        console.error(
          "[ERROR] [SPREADSHEET] Failed to save partner form to Google Sheets:",
          sheetError,
        );
        return NextResponse.json(
          {
            success: false,
            message: "Failed to submit form. Please try again later.",
            error: "spreadsheet_error",
          },
          { status: 500 },
        );
      }
    }

    // ── CONTACT / POC forms ───────────────────────────────────────────────────
    const { name, companyName, email, phone, country, message } = body;

    // Validate required fields
    if (!name || !email || !country || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, country, message, and reason are required.",
        },
        { status: 400 },
      );
    }

    // Validate reason
    if (reason !== "CONTACT" && reason !== "POC") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reason. Must be either CONTACT or POC.",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 },
      );
    }

    // Validate phone if provided
    if (phone) {
      const phoneRegex =
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { success: false, message: "Invalid phone number format." },
          { status: 400 },
        );
      }
    }

    // Add to Google Sheets
    try {
      await addToGoogleSheets(
        reason,
        name.trim(),
        companyName?.trim() || "",
        email.trim().toLowerCase(),
        phone?.trim() || "",
        message.trim(),
      );

      return NextResponse.json(
        {
          success: true,
          message:
            "Your message has been submitted successfully! We will get back to you soon.",
        },
        { status: 201 },
      );
    } catch (sheetError) {
      console.error(
        "[ERROR] [SPREADSHEET] Failed to save to Google Sheets:",
        sheetError,
      );
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit form. Please try again later.",
          error: "spreadsheet_error",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("[ERROR] [API] Error processing form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

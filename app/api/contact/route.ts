import { NextResponse } from "next/server";

// ─── Sanitization ────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return escapeHtml(value.trim());
}

// ─── Validation Helpers ──────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

const VALID_TIMES = ["morning", "mid-morning", "afternoon", "no-preference"];
const VALID_REASONS = ["root-canal", "second-opinion", "emergency", "referred", "other"];

// ─── POST Handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── Honeypot check ─────────────────────────────────────────────────
    if (body.website && typeof body.website === "string" && body.website.trim()) {
      // Bot detected — return success to not tip them off
      return NextResponse.json({ success: true });
    }

    // ── Sanitize all fields ────────────────────────────────────────────
    const data = {
      fullName: sanitize(body.fullName),
      phone: sanitize(body.phone),
      email: sanitize(body.email),
      preferredDate: sanitize(body.preferredDate),
      preferredTime: sanitize(body.preferredTime),
      reason: sanitize(body.reason),
      referringDentist: sanitize(body.referringDentist),
      insurance: sanitize(body.insurance),
      message: sanitize(body.message),
    };

    // ── Required field validation ──────────────────────────────────────
    const errors: string[] = [];

    if (!data.fullName) {
      errors.push("Full name is required");
    }
    if (!data.phone) {
      errors.push("Phone number is required");
    } else if (!isValidPhone(data.phone)) {
      errors.push("Please provide a valid phone number");
    }
    if (!data.email) {
      errors.push("Email address is required");
    } else if (!isValidEmail(data.email)) {
      errors.push("Please provide a valid email address");
    }
    if (data.preferredTime && !VALID_TIMES.includes(data.preferredTime)) {
      errors.push("Invalid preferred time selection");
    }
    if (data.reason && !VALID_REASONS.includes(data.reason)) {
      errors.push("Invalid reason for visit selection");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors[0] },
        { status: 400 }
      );
    }

    // ── Send email via Resend (if API key available) ───────────────────
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const timeLabel =
        VALID_TIMES.find((t) => t === data.preferredTime)
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Not specified";

      const reasonLabel = data.reason
        ? VALID_REASONS.find((r) => r === data.reason)
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()) ?? data.reason
        : "Not specified";

      const isEmergency = data.reason === "emergency";

      const emailHtml = `
        <h2>New Appointment Request${isEmergency ? " — EMERGENCY" : ""}</h2>
        <hr />
        <h3>Patient Contact Information</h3>
        <ul>
          <li><strong>Name:</strong> ${data.fullName}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Email:</strong> ${data.email}</li>
        </ul>
        <h3>Appointment Preferences</h3>
        <ul>
          <li><strong>Preferred Date:</strong> ${data.preferredDate || "Not specified"}</li>
          <li><strong>Preferred Time:</strong> ${timeLabel}</li>
          <li><strong>Reason for Visit:</strong> ${reasonLabel}</li>
          ${data.insurance ? `<li><strong>Insurance:</strong> ${data.insurance}</li>` : ""}
          ${data.referringDentist ? `<li><strong>Referring Dentist:</strong> ${data.referringDentist}</li>` : ""}
        </ul>
        ${data.message ? `<h3>Additional Information</h3><p>${data.message}</p>` : ""}
      `;

      const toEmail = process.env.CONTACT_EMAIL || "info@acadianaendo.com";

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "appointments@acadianaendo.com",
          to: [toEmail],
          subject: `${isEmergency ? "[EMERGENCY] " : ""}Appointment Request: ${data.fullName}`,
          html: emailHtml,
          reply_to: data.email,
        }),
      });

      if (!resendResponse.ok) {
        console.error("Resend API error:", await resendResponse.text());
        return NextResponse.json(
          { success: false, error: "Failed to send your request. Please try again or call us directly." },
          { status: 500 }
        );
      }
    } else {
      // Development: log to console
      console.log("═══════════════════════════════════════════════════");
      console.log("NEW APPOINTMENT REQUEST (no RESEND_API_KEY set)");
      console.log("═══════════════════════════════════════════════════");
      console.log("Name:", data.fullName);
      console.log("Phone:", data.phone);
      console.log("Email:", data.email);
      console.log("───────────────────────────────────────────────────");
      console.log("Preferred Date:", data.preferredDate || "(not specified)");
      console.log("Preferred Time:", data.preferredTime || "(not specified)");
      console.log("Reason:", data.reason || "(not specified)");
      console.log("Referring Dentist:", data.referringDentist || "(not provided)");
      console.log("Insurance:", data.insurance || "(not provided)");
      console.log("Message:", data.message || "(none)");
      console.log("═══════════════════════════════════════════════════");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

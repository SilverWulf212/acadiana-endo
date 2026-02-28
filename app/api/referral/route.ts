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

const VALID_REASONS = [
  "root-canal",
  "retreatment",
  "apicoectomy",
  "cracked-tooth",
  "dental-trauma",
  "consultation",
  "other",
];

const VALID_URGENCIES = ["routine", "urgent", "emergency"];

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
      doctorName: sanitize(body.doctorName),
      practiceName: sanitize(body.practiceName),
      doctorPhone: sanitize(body.doctorPhone),
      doctorEmail: sanitize(body.doctorEmail),
      patientName: sanitize(body.patientName),
      patientPhone: sanitize(body.patientPhone),
      patientDob: sanitize(body.patientDob),
      reason: sanitize(body.reason),
      urgency: sanitize(body.urgency),
      notes: sanitize(body.notes),
    };

    // ── Required field validation ──────────────────────────────────────
    const errors: string[] = [];

    if (!data.doctorName) {
      errors.push("Referring doctor name is required");
    }
    if (!data.doctorPhone) {
      errors.push("Doctor phone number is required");
    } else if (!isValidPhone(data.doctorPhone)) {
      errors.push("Please provide a valid doctor phone number");
    }
    if (!data.doctorEmail) {
      errors.push("Doctor email is required");
    } else if (!isValidEmail(data.doctorEmail)) {
      errors.push("Please provide a valid email address");
    }
    if (!data.patientName) {
      errors.push("Patient name is required");
    }
    if (!data.reason || !VALID_REASONS.includes(data.reason)) {
      errors.push("Please select a valid reason for referral");
    }
    if (data.urgency && !VALID_URGENCIES.includes(data.urgency)) {
      errors.push("Invalid urgency level");
    }
    if (data.patientPhone && !isValidPhone(data.patientPhone)) {
      errors.push("Please provide a valid patient phone number");
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
      const urgencyLabel =
        data.urgency === "emergency"
          ? "EMERGENCY"
          : data.urgency === "urgent"
            ? "URGENT"
            : "Routine";

      const reasonLabel =
        VALID_REASONS.find((r) => r === data.reason)
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) ?? data.reason;

      const emailHtml = `
        <h2>New Patient Referral${data.urgency !== "routine" ? ` — ${urgencyLabel}` : ""}</h2>
        <hr />
        <h3>Referring Doctor</h3>
        <ul>
          <li><strong>Name:</strong> ${data.doctorName}</li>
          ${data.practiceName ? `<li><strong>Practice:</strong> ${data.practiceName}</li>` : ""}
          <li><strong>Phone:</strong> ${data.doctorPhone}</li>
          <li><strong>Email:</strong> ${data.doctorEmail}</li>
        </ul>
        <h3>Patient Information</h3>
        <ul>
          <li><strong>Name:</strong> ${data.patientName}</li>
          ${data.patientPhone ? `<li><strong>Phone:</strong> ${data.patientPhone}</li>` : ""}
          ${data.patientDob ? `<li><strong>DOB:</strong> ${data.patientDob}</li>` : ""}
        </ul>
        <h3>Referral Details</h3>
        <ul>
          <li><strong>Reason:</strong> ${reasonLabel}</li>
          <li><strong>Urgency:</strong> ${urgencyLabel}</li>
          ${data.notes ? `<li><strong>Notes:</strong> ${data.notes}</li>` : ""}
        </ul>
      `;

      const toEmail = process.env.REFERRAL_EMAIL || "info@acadianaendo.com";

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "referrals@acadianaendo.com",
          to: [toEmail],
          subject: `${urgencyLabel !== "Routine" ? `[${urgencyLabel}] ` : ""}New Referral: ${data.patientName} from ${data.doctorName}`,
          html: emailHtml,
          reply_to: data.doctorEmail,
        }),
      });

      if (!resendResponse.ok) {
        console.error("Resend API error:", await resendResponse.text());
        return NextResponse.json(
          { success: false, error: "Failed to send referral. Please try again or call us directly." },
          { status: 500 }
        );
      }
    } else {
      // Development: log to console
      console.log("═══════════════════════════════════════════════════");
      console.log("NEW REFERRAL SUBMISSION (no RESEND_API_KEY set)");
      console.log("═══════════════════════════════════════════════════");
      console.log("Referring Doctor:", data.doctorName);
      console.log("Practice:", data.practiceName || "(not provided)");
      console.log("Doctor Phone:", data.doctorPhone);
      console.log("Doctor Email:", data.doctorEmail);
      console.log("───────────────────────────────────────────────────");
      console.log("Patient:", data.patientName);
      console.log("Patient Phone:", data.patientPhone || "(not provided)");
      console.log("Patient DOB:", data.patientDob || "(not provided)");
      console.log("───────────────────────────────────────────────────");
      console.log("Reason:", data.reason);
      console.log("Urgency:", data.urgency || "routine");
      console.log("Notes:", data.notes || "(none)");
      console.log("═══════════════════════════════════════════════════");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Referral form error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

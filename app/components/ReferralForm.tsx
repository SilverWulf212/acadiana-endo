"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { cn } from "@/app/lib/utils";
import { PRACTICE_EMAIL } from "@/app/lib/constants";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // Referring dentist
  doctorName: string;
  practiceName: string;
  doctorPhone: string;
  doctorEmail: string;
  // Patient
  patientName: string;
  patientPhone: string;
  patientDob: string;
  // Referral details
  reason: string;
  urgency: string;
  notes: string;
  // Honeypot
  website: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFormData: FormData = {
  doctorName: "",
  practiceName: "",
  doctorPhone: "",
  doctorEmail: "",
  patientName: "",
  patientPhone: "",
  patientDob: "",
  reason: "",
  urgency: "routine",
  notes: "",
  website: "",
};

const REFERRAL_REASONS = [
  { value: "", label: "Select reason for referral" },
  { value: "root-canal", label: "Root Canal Therapy" },
  { value: "retreatment", label: "Endodontic Retreatment" },
  { value: "apicoectomy", label: "Apicoectomy" },
  { value: "cracked-tooth", label: "Cracked Tooth Evaluation" },
  { value: "dental-trauma", label: "Dental Trauma" },
  { value: "consultation", label: "Consultation" },
  { value: "other", label: "Other" },
];

// ─── Validation Helpers ──────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  // Accept digits, spaces, dashes, parens, dots, plus — at least 10 digits
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

function formatPhoneDisplay(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReferralForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    // Format phone fields on the fly
    if (name === "doctorPhone" || name === "patientPhone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneDisplay(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field error on change
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.doctorName.trim()) {
      errors.doctorName = "Referring doctor name is required";
    }
    if (!formData.doctorPhone.trim()) {
      errors.doctorPhone = "Phone number is required";
    } else if (!isValidPhone(formData.doctorPhone)) {
      errors.doctorPhone = "Please enter a valid phone number";
    }
    if (!formData.doctorEmail.trim()) {
      errors.doctorEmail = "Email address is required";
    } else if (!isValidEmail(formData.doctorEmail)) {
      errors.doctorEmail = "Please enter a valid email address";
    }
    if (!formData.patientName.trim()) {
      errors.patientName = "Patient name is required";
    }
    if (formData.patientPhone && !isValidPhone(formData.patientPhone)) {
      errors.patientPhone = "Please enter a valid phone number";
    }
    if (!formData.reason) {
      errors.reason = "Please select a reason for referral";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    // Honeypot — silently succeed for bots
    if (formData.website) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    const reasonLabel =
      REFERRAL_REASONS.find((r) => r.value === formData.reason)?.label ??
      formData.reason;
    const urgencyLabel =
      formData.urgency === "emergency"
        ? "EMERGENCY"
        : formData.urgency === "urgent"
          ? "URGENT"
          : "Routine";

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${PRACTICE_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `${urgencyLabel !== "Routine" ? `[${urgencyLabel}] ` : ""}Referral: ${formData.patientName} from ${formData.doctorName}`,
            _replyto: formData.doctorEmail,
            _template: "table",
            _captcha: "false",
            "Referring Doctor": formData.doctorName,
            "Practice Name": formData.practiceName || "Not provided",
            "Doctor Phone": formData.doctorPhone,
            "Doctor Email": formData.doctorEmail,
            "Patient Name": formData.patientName,
            "Patient Phone": formData.patientPhone || "Not provided",
            "Patient DOB": formData.patientDob || "Not provided",
            "Reason for Referral": reasonLabel,
            Urgency: urgencyLabel,
            Notes: formData.notes || "None",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.success !== "true") {
        throw new Error(
          "Something went wrong. Please try again or call us directly."
        );
      }

      setStatus("success");
      setFormData(initialFormData);
      setFieldErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  }

  // ─── Success State ─────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center lg:p-14">
        {/* Checkmark icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-green-600"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-3 font-heading text-2xl font-bold text-green-800">
          Referral Received
        </h3>
        <p className="mx-auto max-w-md text-base leading-relaxed text-green-700">
          Thank you for your referral. Our team will contact the patient within
          1-2 business days to schedule their appointment. A confirmation will
          be sent to your email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-primary mt-8"
        >
          Submit Another Referral
        </button>
      </div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────────────────────

  const inputBaseClasses =
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-400/20";
  const inputErrorClasses = "border-red-300 focus:border-red-400 focus:ring-red-400/20";
  const inputDefaultClasses = "border-steel-200 hover:border-steel-300";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-10"
    >
      {/* ── Referring Doctor Information ───────────────────────────────────── */}
      <fieldset>
        <legend className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-gold-400">
            1
          </div>
          <span className="font-heading text-lg font-bold text-navy-800">
            Referring Doctor Information
          </span>
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Doctor Name */}
          <div>
            <label
              htmlFor="doctorName"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Doctor Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Dr. John Smith"
              autoComplete="name"
              className={cn(
                inputBaseClasses,
                fieldErrors.doctorName ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.doctorName && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.doctorName}</p>
            )}
          </div>

          {/* Practice Name */}
          <div>
            <label
              htmlFor="practiceName"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Practice Name
            </label>
            <input
              type="text"
              id="practiceName"
              name="practiceName"
              value={formData.practiceName}
              onChange={handleChange}
              placeholder="Lafayette Family Dentistry"
              autoComplete="organization"
              className={cn(inputBaseClasses, inputDefaultClasses)}
            />
          </div>

          {/* Doctor Phone */}
          <div>
            <label
              htmlFor="doctorPhone"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="doctorPhone"
              name="doctorPhone"
              value={formData.doctorPhone}
              onChange={handleChange}
              placeholder="(337) 555-0100"
              autoComplete="tel"
              className={cn(
                inputBaseClasses,
                fieldErrors.doctorPhone ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.doctorPhone && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.doctorPhone}</p>
            )}
          </div>

          {/* Doctor Email */}
          <div>
            <label
              htmlFor="doctorEmail"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="doctorEmail"
              name="doctorEmail"
              value={formData.doctorEmail}
              onChange={handleChange}
              placeholder="doctor@practice.com"
              autoComplete="email"
              className={cn(
                inputBaseClasses,
                fieldErrors.doctorEmail ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.doctorEmail && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.doctorEmail}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Patient Information ────────────────────────────────────────────── */}
      <fieldset>
        <legend className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-gold-400">
            2
          </div>
          <span className="font-heading text-lg font-bold text-navy-800">
            Patient Information
          </span>
        </legend>

        <div className="grid gap-5 sm:grid-cols-3">
          {/* Patient Name */}
          <div>
            <label
              htmlFor="patientName"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Patient Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={cn(
                inputBaseClasses,
                fieldErrors.patientName ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.patientName && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.patientName}</p>
            )}
          </div>

          {/* Patient Phone */}
          <div>
            <label
              htmlFor="patientPhone"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Patient Phone
            </label>
            <input
              type="tel"
              id="patientPhone"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              placeholder="(337) 555-0200"
              className={cn(
                inputBaseClasses,
                fieldErrors.patientPhone ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.patientPhone && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.patientPhone}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="patientDob"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="patientDob"
              name="patientDob"
              value={formData.patientDob}
              onChange={handleChange}
              className={cn(inputBaseClasses, inputDefaultClasses)}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Referral Details ───────────────────────────────────────────────── */}
      <fieldset>
        <legend className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-gold-400">
            3
          </div>
          <span className="font-heading text-lg font-bold text-navy-800">
            Referral Details
          </span>
        </legend>

        <div className="space-y-5">
          {/* Reason for Referral */}
          <div>
            <label
              htmlFor="reason"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Reason for Referral <span className="text-red-400">*</span>
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={cn(
                inputBaseClasses,
                fieldErrors.reason ? inputErrorClasses : inputDefaultClasses,
                !formData.reason && "text-gray-400"
              )}
            >
              {REFERRAL_REASONS.map((r) => (
                <option key={r.value} value={r.value} disabled={r.value === ""}>
                  {r.label}
                </option>
              ))}
            </select>
            {fieldErrors.reason && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.reason}</p>
            )}
          </div>

          {/* Urgency Level */}
          <div>
            <span className="mb-3 block text-sm font-semibold text-navy-700">
              Urgency Level
            </span>
            <div className="flex flex-wrap gap-4">
              {[
                { value: "routine", label: "Routine", color: "bg-green-50 border-green-200 text-green-800 peer-checked:bg-green-100 peer-checked:border-green-400" },
                { value: "urgent", label: "Urgent", color: "bg-amber-50 border-amber-200 text-amber-800 peer-checked:bg-amber-100 peer-checked:border-amber-400" },
                { value: "emergency", label: "Emergency", color: "bg-red-50 border-red-200 text-red-800 peer-checked:bg-red-100 peer-checked:border-red-400" },
              ].map((option) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="urgency"
                    value={option.value}
                    checked={formData.urgency === option.value}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                      option.color
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        option.value === "routine" && "bg-green-500",
                        option.value === "urgent" && "bg-amber-500",
                        option.value === "emergency" && "bg-red-500"
                      )}
                    />
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Include any relevant clinical findings, tooth numbers, symptoms, radiograph availability, etc."
              rows={4}
              className={cn(inputBaseClasses, inputDefaultClasses, "resize-y")}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Honeypot (hidden from humans) ─────────────────────────────────── */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ── Error Message ─────────────────────────────────────────────────── */}
      {status === "error" && errorMessage && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* ── Submit ─────────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "btn btn-lg w-full bg-gold-400 text-navy-900 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-400/25 sm:w-auto",
            status === "submitting" && "cursor-not-allowed opacity-70"
          )}
        >
          {status === "submitting" ? (
            <>
              {/* Spinner */}
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting Referral...
            </>
          ) : (
            "Submit Referral"
          )}
        </button>
      </div>
    </form>
  );
}

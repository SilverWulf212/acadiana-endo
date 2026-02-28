"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { cn } from "@/app/lib/utils";
import { PRACTICE_EMAIL } from "@/app/lib/constants";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  referringDentist: string;
  insurance: string;
  message: string;
  // Honeypot
  website: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
  reason: "",
  referringDentist: "",
  insurance: "",
  message: "",
  website: "",
};

const TIME_OPTIONS = [
  { value: "", label: "Select preferred time" },
  { value: "morning", label: "Morning (7 - 10 AM)" },
  { value: "mid-morning", label: "Mid-Morning (10 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 - 4 PM)" },
  { value: "no-preference", label: "No Preference" },
];

const REASON_OPTIONS = [
  { value: "", label: "Select reason for visit" },
  { value: "root-canal", label: "Root Canal" },
  { value: "second-opinion", label: "Second Opinion" },
  { value: "emergency", label: "Emergency / Pain" },
  { value: "referred", label: "Referred by Dentist" },
  { value: "other", label: "Other" },
];

// ─── Validation Helpers ──────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
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

export default function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    // Format phone on the fly
    if (name === "phone") {
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

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
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

    const timeLabel =
      TIME_OPTIONS.find((t) => t.value === formData.preferredTime)?.label ??
      "No Preference";
    const reasonLabel =
      REASON_OPTIONS.find((r) => r.value === formData.reason)?.label ??
      "Not specified";
    const isEmergency = formData.reason === "emergency";

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
            _subject: `${isEmergency ? "[EMERGENCY] " : ""}Appointment Request: ${formData.fullName}`,
            _replyto: formData.email,
            _template: "table",
            _captcha: "false",
            "Full Name": formData.fullName,
            Phone: formData.phone,
            Email: formData.email,
            "Preferred Date": formData.preferredDate || "Not specified",
            "Preferred Time": timeLabel,
            "Reason for Visit": reasonLabel,
            "Referring Dentist": formData.referringDentist || "Not provided",
            Insurance: formData.insurance || "Not provided",
            Message: formData.message || "None",
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

  // ─── Success State ──────────────────────────────────────────────────────────

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
          Request Received
        </h3>
        <p className="mx-auto max-w-md text-base leading-relaxed text-green-700">
          Thank you for your appointment request. Our team will call you within
          1 business day to confirm your appointment date and time.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-primary mt-8"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  // ─── Form ───────────────────────────────────────────────────────────────────

  const inputBaseClasses =
    "w-full rounded-lg border bg-white px-4 py-3 text-base text-navy-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-400/20";
  const inputErrorClasses = "border-red-300 focus:border-red-400 focus:ring-red-400/20";
  const inputDefaultClasses = "border-steel-200 hover:border-steel-300";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8"
    >
      {/* Form Header */}
      <div>
        <h2 className="heading-subsection">Request an Appointment</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Fill out the form below and our team will call you to confirm your
          appointment. Fields marked with <span className="text-red-400">*</span> are required.
        </p>
      </div>

      {/* ── Contact Information ────────────────────────────────────────────── */}
      <fieldset>
        <legend className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-gold-400">
            1
          </div>
          <span className="font-heading text-lg font-bold text-navy-800">
            Your Information
          </span>
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
              className={cn(
                inputBaseClasses,
                fieldErrors.fullName ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.fullName && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(337) 555-0100"
              autoComplete="tel"
              className={cn(
                inputBaseClasses,
                fieldErrors.phone ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              autoComplete="email"
              className={cn(
                inputBaseClasses,
                fieldErrors.email ? inputErrorClasses : inputDefaultClasses
              )}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Appointment Preferences ────────────────────────────────────────── */}
      <fieldset>
        <legend className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-gold-400">
            2
          </div>
          <span className="font-heading text-lg font-bold text-navy-800">
            Appointment Preferences
          </span>
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Preferred Date */}
          <div>
            <label
              htmlFor="preferredDate"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Preferred Date
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={cn(inputBaseClasses, inputDefaultClasses)}
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label
              htmlFor="preferredTime"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className={cn(
                inputBaseClasses,
                inputDefaultClasses,
                !formData.preferredTime && "text-gray-400"
              )}
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t.value} value={t.value} disabled={t.value === ""}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reason for Visit */}
          <div>
            <label
              htmlFor="reason"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Reason for Visit
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={cn(
                inputBaseClasses,
                inputDefaultClasses,
                !formData.reason && "text-gray-400"
              )}
            >
              {REASON_OPTIONS.map((r) => (
                <option key={r.value} value={r.value} disabled={r.value === ""}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Insurance Provider */}
          <div>
            <label
              htmlFor="insurance"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Insurance Provider
            </label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              placeholder="e.g., Delta Dental, BlueCross"
              className={cn(inputBaseClasses, inputDefaultClasses)}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Additional Details ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-gold-400">
            3
          </div>
          <span className="font-heading text-lg font-bold text-navy-800">
            Additional Details
          </span>
        </legend>

        <div className="space-y-5">
          {/* Referring Dentist */}
          <div>
            <label
              htmlFor="referringDentist"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Referring Dentist Name
            </label>
            <input
              type="text"
              id="referringDentist"
              name="referringDentist"
              value={formData.referringDentist}
              onChange={handleChange}
              placeholder="Dr. Jane Smith"
              className={cn(inputBaseClasses, inputDefaultClasses)}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-semibold text-navy-700"
            >
              Message / Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please share any details about your symptoms, concerns, or questions you may have."
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

      {/* ── Note ───────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 rounded-lg border border-navy-100 bg-navy-50 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mt-0.5 h-5 w-5 shrink-0 text-navy-400"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm leading-relaxed text-navy-600">
          This form sends a request. Our team will call you to confirm your
          appointment date and time.
        </p>
      </div>

      {/* ── Error Message ──────────────────────────────────────────────────── */}
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

      {/* ── Submit ────────────────────────────────────────────────────────── */}
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
              Sending Request...
            </>
          ) : (
            "Request Appointment"
          )}
        </button>
      </div>
    </form>
  );
}

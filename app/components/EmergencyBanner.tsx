import { PHONE_LAFAYETTE } from "@/app/lib/constants";

export default function EmergencyBanner() {
  return (
    <div className="bg-navy-950 py-2">
      <div className="container flex items-center justify-center gap-2 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-white/90">
          Dental emergency?{" "}
          <a
            href={`tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`}
            className="font-semibold text-gold-400 underline underline-offset-2 transition-colors duration-200 hover:text-gold-300"
          >
            Call {PHONE_LAFAYETTE}
          </a>
        </p>
      </div>
    </div>
  );
}

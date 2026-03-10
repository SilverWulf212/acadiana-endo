import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface DoctorCardProps {
  name: string;
  credentials: string;
  title: string;
  bio: string;
  imageUrl: string;
  education?: { degree: string; institution: string; year?: string }[];
  className?: string;
}

/** Extract initials from a name like "John H. Smith" => "JS" */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.endsWith(".") || part.length > 2)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}


export default function DoctorCard({
  name,
  credentials,
  title,
  bio,
  imageUrl,
  education,
  className,
}: DoctorCardProps) {
  const initials = getInitials(name);
  const hasImage = imageUrl && imageUrl.trim() !== "";

  return (
    <div
      className={cn(
        "group flex flex-col items-center rounded-xl border border-steel-200 bg-white p-8 text-center transition-all duration-300 lg:p-10",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-800/5",
        className
      )}
    >
      {/* Photo / Initials Avatar */}
      <div className="mb-6">
        {hasImage ? (
          <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-navy-100 transition-all duration-300 group-hover:ring-gold-300 group-hover:shadow-[0_0_15px_rgba(200,169,110,0.4)]">
            <Image
              src={imageUrl}
              alt={`${name}, ${credentials}`}
              width={288}
              height={288}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-navy-100 to-navy-200 ring-4 ring-navy-100 transition-all duration-300 group-hover:ring-gold-300 group-hover:shadow-[0_0_15px_rgba(200,169,110,0.4)]">
            <span className="font-heading text-3xl font-bold text-navy-400">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Name + Credentials */}
      <h3 className="font-heading text-xl font-bold text-navy-800">
        {name}
        {credentials && (
          <span className="ml-1 font-semibold text-navy-500">
            , {credentials}
          </span>
        )}
      </h3>

      {/* Title */}
      <p className="mt-1 text-sm font-medium text-gold-600">{title}</p>

      {/* Gold accent */}
      <div
        className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-gold-400"
        aria-hidden="true"
      />

      {/* Bio excerpt — reveals more text on hover with gradient fade */}
      <div className="relative mt-4 max-h-[4.5em] overflow-hidden transition-all duration-500 group-hover:max-h-[10em]">
        <p className="text-sm leading-relaxed text-gray-600">
          {bio.split("\n\n")[0]}
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      {/* Education (optional) */}
      {education && education.length > 0 && (
        <div className="mt-5 w-full border-t border-steel-100 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy-500">
            Education
          </p>
          <ul className="space-y-1">
            {education.slice(0, 3).map((edu, index) => (
              <li key={index} className="text-xs text-gray-500">
                {edu.degree} &mdash; {edu.institution}
                {edu.year && (
                  <span className="text-gray-400"> ({edu.year})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* View full bio link */}
      <Link
        href="/about"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 transition-all duration-200 hover:text-gold-600"
      >
        View full bio
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}

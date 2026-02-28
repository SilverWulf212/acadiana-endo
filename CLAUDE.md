# Acadiana Endodontics -- Project Instructions

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 (oklch design tokens)
- pnpm

## Commands
- `pnpm dev` -- Start dev server
- `pnpm build` -- Production build
- `pnpm lint` -- Run ESLint

## Architecture
- `app/lib/constants.ts` -- Single source of truth for practice info
- `app/lib/types.ts` -- TypeScript interfaces
- `app/data/` -- Static data files (services, doctors, faqs, etc.)
- `app/components/` -- Shared React components
- `app/api/` -- API routes (contact form, referral form)

## Design System
- Colors: navy (primary), gold (accent), gray (neutral), steel (borders)
- Fonts: Figtree (headings), Source Sans 3 (body)
- Component classes in globals.css (@layer components)
- 6 CSS animations with prefers-reduced-motion support

## Conventions
- Use cn() from utils for conditional Tailwind classes
- Use next/link for internal navigation
- Use constants from constants.ts (never hardcode practice info)
- All client components must have "use client" directive
- Use inline SVG for icons (no icon library)

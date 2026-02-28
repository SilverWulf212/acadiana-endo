import type { Metadata } from "next";
import { Figtree, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EmergencyBanner from "@/app/components/EmergencyBanner";
import ClickToCall from "@/app/components/ClickToCall";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acadianaendo.com"),
  title: {
    default:
      "Acadiana Endodontics | Expert Root Canal Treatment in Lafayette, LA",
    template: "%s | Acadiana Endodontics",
  },
  description:
    "Board-certified endodontists in Lafayette & New Iberia, LA. Gentle root canal therapy, retreatment, apicoectomy & emergency dental care. Call (337) 981-0144.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Acadiana Endodontics",
    title: "Acadiana Endodontics | Expert Root Canal Treatment in Lafayette, LA",
    description:
      "Board-certified endodontists in Lafayette & New Iberia, LA. Gentle root canal therapy, retreatment, apicoectomy & emergency dental care.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acadiana Endodontics | Expert Root Canal Treatment",
    description:
      "Board-certified endodontists in Lafayette & New Iberia, LA. Gentle, advanced treatment you can trust.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${sourceSans3.variable} antialiased`}
      >
        {/* Skip to main content — visible on keyboard focus */}
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-gold-400 px-5 py-3 font-heading text-sm font-semibold text-navy-900 shadow-lg transition-transform duration-200 focus:translate-y-0"
        >
          Skip to main content
        </a>

        <EmergencyBanner />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ClickToCall />
      </body>
    </html>
  );
}

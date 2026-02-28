import type { Metadata } from "next";
import { Figtree, Source_Sans_3 } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "Acadiana Endodontics | Root Canal Specialists in Lafayette & New Iberia, LA",
    template: "%s | Acadiana Endodontics",
  },
  description:
    "Acadiana Endodontics provides expert root canal therapy and endodontic care in Lafayette and New Iberia, Louisiana. Gentle, advanced treatment you can trust.",
  icons: {
    icon: "/favicon.svg",
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
        {children}
      </body>
    </html>
  );
}

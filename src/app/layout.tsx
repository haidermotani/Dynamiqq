import type { Metadata, Viewport } from "next";
import { Archivo, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { business } from "@/config/business";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dynamiq.pk";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const archivoItalic = Archivo({
  variable: "--font-archivo-italic",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dynamiq | Custom Football and Cricket Jerseys in Karachi",
    template: "%s | Dynamiq",
  },
  description:
    "Custom football and cricket jerseys, kits and sportswear built in Karachi. Name, number and club logo printed your way, delivered across the city. EasyPaisa.",
  openGraph: {
    type: "website",
    siteName: business.name,
    title: "Dynamiq | Custom Football and Cricket Jerseys in Karachi",
    description:
      "Jerseys, kits and custom sportswear built in Karachi. Your name, number and club logo on the shirt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamiq | Custom Football and Cricket Jerseys in Karachi",
    description:
      "Jerseys, kits and custom sportswear built in Karachi. Your name, number and club logo on the shirt.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060708",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoItalic.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-mist">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
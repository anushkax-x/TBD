import { BUSINESS_NAME } from "@consultancy/shared";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatProvider } from "@/components/chat/chat-provider";
import { ContactProvider } from "@/components/contact/contact-provider";
import { MotionProviders } from "@/components/motion/providers";
import { AnalyticsProvider } from "@/lib/analytics";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BUSINESS_NAME} — Your business, on autopilot`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Practical workflow automation, UI/UX redesign, custom software solutions and online presence for growing businesses with manual or disconnected operations.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: `${BUSINESS_NAME} — Automation, UI/UX, custom solutions & online presence`,
    description:
      "Automate operations, redesign interfaces, ship custom solutions and grow your online presence—without building an in-house engineering team.",
    type: "website",
    locale: "en_GB",
    siteName: BUSINESS_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} — Automation, UI/UX, custom solutions & online presence`,
    description:
      "Automation, UI/UX redesign, custom solutions and online presence for growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
        <MotionProviders>
          <AnalyticsProvider>
            <ContactProvider>
              <ChatProvider>{children}</ChatProvider>
            </ContactProvider>
          </AnalyticsProvider>
        </MotionProviders>
      </body>
    </html>
  );
}

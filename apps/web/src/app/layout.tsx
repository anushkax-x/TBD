import { BUSINESS_NAME } from "@consultancy/shared";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ChatProvider } from "@/components/chat/chat-provider";
import { ContactProvider } from "@/components/contact/contact-provider";
import { AnalyticsProvider } from "@/lib/analytics";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Automation, UI/UX, Custom Solutions & Online Presence | ${BUSINESS_NAME}`,
  description:
    "Practical workflow automation, UI/UX redesign, custom software solutions and online presence for growing businesses with manual or disconnected operations.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: `Automation, UI/UX, Custom Solutions & Online Presence | ${BUSINESS_NAME}`,
    description:
      "Automate operations, redesign interfaces, ship custom solutions and grow your online presence—without building an in-house engineering team.",
    type: "website",
    locale: "en_GB",
    siteName: BUSINESS_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Automation, UI/UX, Custom Solutions & Online Presence | ${BUSINESS_NAME}`,
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
    <html lang="en" className={ibmPlexSans.variable}>
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
        <AnalyticsProvider>
          <ContactProvider>
            <ChatProvider>{children}</ChatProvider>
          </ContactProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}

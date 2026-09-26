import { BUSINESS_NAME } from "@consultancy/shared";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
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
  title: `Business Automation & Technology Solutions | ${BUSINESS_NAME}`,
  description:
    "We help growing businesses automate workflows, improve sales processes and connect their existing technology with practical automation, AI and custom software.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `Business Automation & Technology Solutions | ${BUSINESS_NAME}`,
    description:
      "We help growing businesses automate workflows, improve sales processes and connect their existing technology with practical automation, AI and custom software.",
    type: "website",
    locale: "en_GB",
    siteName: BUSINESS_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Business Automation & Technology Solutions | ${BUSINESS_NAME}`,
    description:
      "We help growing businesses automate workflows, improve sales processes and connect their existing technology.",
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
          <ContactProvider>{children}</ContactProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}

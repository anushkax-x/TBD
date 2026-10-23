"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || "G-4J2YZCDWFH";

type AnalyticsEvent =
  | "page_view"
  | "CTA_clicked"
  | "contact_form_started"
  | "contact_form_submitted"
  | "booking_clicked"
  | "example_project_viewed"
  | "chat_prompt_shown"
  | "chat_prompt_dismissed"
  | "chat_started"
  | "chat_ended"
  | "chat_meeting_requested";

type AnalyticsContextValue = {
  track: (event: AnalyticsEvent, props?: Record<string, string>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue>({
  track: () => undefined,
});

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const track = useCallback(
    (event: AnalyticsEvent, props?: Record<string, string>) => {
      if (!GA_ID || typeof window === "undefined") return;
      window.dispatchEvent(
        new CustomEvent("consultancy:analytics", {
          detail: { event, props, id: GA_ID },
        }),
      );
      // GA4 records page views itself (incl. client-side route changes)
      if (event !== "page_view") window.gtag?.("event", event, props);
    },
    [],
  );

  useEffect(() => {
    track("page_view", { path: window.location.pathname });
  }, [track]);

  const value = useMemo(() => ({ track }), [track]);
  return (
    <AnalyticsContext.Provider value={value}>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

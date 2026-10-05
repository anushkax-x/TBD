"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

type AnalyticsEvent =
  | "page_view"
  | "CTA_clicked"
  | "contact_form_started"
  | "contact_form_submitted"
  | "booking_clicked"
  | "example_project_viewed"
  | "chat_prompt_shown"
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
      const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
      if (!id) return;
      // Provider-agnostic stub — wire to GA/Plausible/etc. when ID is set
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("consultancy:analytics", {
            detail: { event, props, id },
          }),
        );
      }
    },
    [],
  );

  useEffect(() => {
    track("page_view", { path: window.location.pathname });
  }, [track]);

  const value = useMemo(() => ({ track }), [track]);
  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

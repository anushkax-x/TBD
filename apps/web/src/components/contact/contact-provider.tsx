"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getBookingUrl } from "@/lib/config";
import { useAnalytics } from "@/lib/analytics";
import { ContactModal } from "./contact-modal";

type ContactContextValue = {
  openContact: (source?: string) => void;
  closeContact: () => void;
  handlePrimaryCta: (source?: string) => void;
  isOpen: boolean;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { track } = useAnalytics();

  const openContact = useCallback(
    (source = "unknown") => {
      track("CTA_clicked", { source, action: "open_contact" });
      setIsOpen(true);
    },
    [track],
  );

  const closeContact = useCallback(() => setIsOpen(false), []);

  const handlePrimaryCta = useCallback(
    (source = "unknown") => {
      const booking = getBookingUrl();
      if (booking) {
        track("booking_clicked", { source });
        window.open(booking, "_blank", "noopener,noreferrer");
        return;
      }
      openContact(source);
    },
    [openContact, track],
  );

  const value = useMemo(
    () => ({ openContact, closeContact, handlePrimaryCta, isOpen }),
    [openContact, closeContact, handlePrimaryCta, isOpen],
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}

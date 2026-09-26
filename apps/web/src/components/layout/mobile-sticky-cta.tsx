"use client";

import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";

export function MobileStickyCta() {
  const { handlePrimaryCta } = useContact();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 p-3 backdrop-blur-sm md:hidden">
      <Button
        className="w-full"
        onClick={() => handlePrimaryCta("mobile_sticky")}
      >
        Book a Discovery Call
      </Button>
    </div>
  );
}

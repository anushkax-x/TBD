"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "@/components/chat/chat-provider";

export function MobileStickyCta() {
  const { openChat } = useChat();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 p-3 backdrop-blur-sm md:hidden">
      <Button
        className="w-full"
        onClick={() => openChat("mobile_sticky")}
      >
        Check Your Idea With Our AI
      </Button>
    </div>
  );
}

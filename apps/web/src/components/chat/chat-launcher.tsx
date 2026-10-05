"use client";

import { MessageCircle } from "lucide-react";
import { useChat } from "./chat-provider";

export function ChatLauncher() {
  const { isOpen, openChat } = useChat();
  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={() => openChat("chat_launcher")}
      className="fixed bottom-20 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-surface shadow-lg transition-colors hover:bg-accent-hover md:bottom-6 md:right-6 md:h-14 md:w-14"
      aria-label="Chat with our AI assistant"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}

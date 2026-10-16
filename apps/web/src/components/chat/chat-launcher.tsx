"use client";

import { MessageCircle, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/easing";
import { useChat } from "./chat-provider";

export function ChatLauncher() {
  const { isOpen, promptVisible, openChat, startChat, dismissPrompt } = useChat();

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="launcher"
          className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence>
            {promptVisible && (
              <motion.div
                key="prompt"
                role="status"
                className="card-glass relative w-60 origin-bottom-right rounded-2xl bg-surface-elevated/95 p-4 pr-10 sm:w-68"
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                <button
                  type="button"
                  onClick={dismissPrompt}
                  className="absolute right-2 top-2 rounded-full p-1.5 text-slate transition-colors hover:bg-white/5 hover:text-ink"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      Need help with your business?
                    </p>
                    <p className="mt-1 hidden text-xs leading-relaxed text-slate sm:block">
                      Check if what you need is feasible
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        openChat("chat_prompt");
                        startChat();
                      }}
                      className="mt-3 rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-surface transition-colors hover:bg-accent-hover"
                    >
                      Start chat
                    </button>
                  </div>
                </div>
                {/* Tail pointing at the launcher */}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-hairline bg-[#0d151e]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => openChat("chat_launcher")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-surface shadow-[0_8px_28px_-6px_var(--accent-glow)] transition-colors hover:bg-accent-hover md:h-14 md:w-14"
            aria-label="Chat with our AI assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CalendarCheck, Loader2, Send, Sparkles, X } from "lucide-react";
import { CHAT_MAX_MESSAGE_LENGTH } from "@consultancy/shared";
import { Button } from "@/components/ui/button";
import { getBookingUrl } from "@/lib/config";
import { useAnalytics } from "@/lib/analytics";
import { useChat } from "./chat-provider";

export function ChatModal() {
  const { isOpen, view, closeChat } = useChat();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeChat]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
    >
      <button
        type="button"
        className="chat-backdrop absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={closeChat}
      />
      <div
        className={`chat-panel relative z-10 flex w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-2xl sm:mx-6 sm:rounded-2xl ${
          view === "intro"
            ? "max-h-[92vh] sm:max-w-xl"
            : "h-[92vh] sm:h-[min(840px,88vh)] sm:max-w-3xl"
        }`}
      >
        {view === "intro" ? <IntroView /> : <ChatView />}
      </div>
    </div>
  );
}

function CloseButton() {
  const { closeChat } = useChat();
  return (
    <button
      type="button"
      onClick={closeChat}
      className="rounded-md p-2 text-slate hover:bg-surface hover:text-ink"
      aria-label="Close"
    >
      <X className="h-5 w-5" />
    </button>
  );
}

function IntroView() {
  const { startChat, closeChat } = useChat();

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Sparkles className="h-5 w-5" />
        </span>
        <CloseButton />
      </div>
      <h2 id="chat-modal-title" className="mt-4 font-display text-2xl text-ink">
        Need help with your business?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate">
        Ask our AI whether what you need is feasible, from automating
        repetitive work and connecting your tools to AI and fully custom
        software. We can help with almost anything.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate">
        It takes a couple of minutes, and our team will personally review the
        conversation and follow up.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button className="sm:flex-1" onClick={startChat}>
          Start chat
        </Button>
        <Button variant="secondary" className="sm:flex-1" onClick={closeChat}>
          Maybe later
        </Button>
      </div>
    </div>
  );
}

function ChatView() {
  const {
    messages,
    isSending,
    streamingText,
    error,
    meetingRequested,
    endStatus,
    hasUserMessages,
    sendMessage,
    finishChat,
    resetChat,
  } = useChat();
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ended = endStatus === "sending" || endStatus === "sent";

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, streamingText, endStatus]);

  useEffect(() => {
    if (!ended) inputRef.current?.focus();
  }, [ended]);

  const submitDraft = () => {
    if (!draft.trim() || isSending) return;
    void sendMessage(draft);
    setDraft("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitDraft();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h2 id="chat-modal-title" className="text-base font-semibold text-ink">
              AI business assistant
            </h2>
            <p className="text-xs text-slate-muted">
              Check if what you need is feasible
            </p>
          </div>
        </div>
        <CloseButton />
      </div>

      <div
        ref={listRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6 sm:px-8"
        aria-live="polite"
        aria-busy={isSending}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} />
        ))}
        {streamingText !== null &&
          (streamingText === "" ? (
            <AssistantRow>
              <div
                className="rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3.5"
                aria-label="Assistant is typing"
              >
                <span className="flex gap-1.5">
                  <span className="chat-typing-dot h-2 w-2 rounded-full bg-accent" />
                  <span className="chat-typing-dot h-2 w-2 rounded-full bg-accent [animation-delay:0.15s]" />
                  <span className="chat-typing-dot h-2 w-2 rounded-full bg-accent [animation-delay:0.3s]" />
                </span>
              </div>
            </AssistantRow>
          ) : (
            <MessageBubble role="model" text={streamingText} streaming />
          ))}
        {error && (
          <p role="alert" className="self-center text-center text-xs text-red-400">
            {error}
          </p>
        )}
      </div>

      {meetingRequested && <MeetingBanner />}

      {endStatus === "sent" || endStatus === "sending" ? (
        <div className="border-t border-border px-5 py-4 text-center">
          <p className="text-sm text-ink-soft">
            {endStatus === "sending"
              ? "Sending your conversation to our team..."
              : "Thanks! Our team has your conversation and will be in touch soon."}
          </p>
          {endStatus === "sent" && (
            <Button variant="ghost" className="mt-2" onClick={resetChat}>
              Start a new chat
            </Button>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="border-t border-border px-5 py-4 sm:px-8 sm:py-5">
          {endStatus === "error" && (
            <p role="alert" className="mb-2 text-xs text-red-400">
              We couldn&apos;t send your conversation. Please try again.
            </p>
          )}
          <div className="flex items-end gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Your message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={draft}
              maxLength={CHAT_MAX_MESSAGE_LENGTH}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  submitDraft();
                }
              }}
              placeholder="Describe what you'd like to improve..."
              className="max-h-40 min-h-[48px] flex-1 resize-none rounded-lg border border-border bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none"
            />
            <Button
              type="submit"
              className="h-[48px] px-4"
              disabled={isSending || !draft.trim()}
              aria-label="Send message"
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          {hasUserMessages && (
            <button
              type="button"
              onClick={() => void finishChat()}
              disabled={isSending}
              className="mt-3 text-xs font-medium text-accent hover:text-accent-hover disabled:opacity-60"
            >
              End chat &amp; send to our team
            </button>
          )}
        </form>
      )}
    </>
  );
}

function AssistantRow({ children }: { children: ReactNode }) {
  return (
    <div className="chat-bubble flex max-w-[88%] items-start gap-2.5 self-start">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      {children}
    </div>
  );
}

function MessageBubble({
  role,
  text,
  streaming = false,
}: {
  role: "user" | "model";
  text: string;
  streaming?: boolean;
}) {
  if (role === "user") {
    return (
      <div className="chat-bubble max-w-[80%] self-end whitespace-pre-wrap rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-[15px] leading-relaxed text-surface">
        {text}
      </div>
    );
  }
  return (
    <AssistantRow>
      <div className="whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink-soft">
        {streaming ? text.trimStart() : text}
        {streaming && <span className="chat-caret text-accent" aria-hidden="true" />}
      </div>
    </AssistantRow>
  );
}

function MeetingBanner() {
  const { track } = useAnalytics();
  const bookingUrl = getBookingUrl();

  return (
    <div className="chat-bubble mx-5 mb-3 flex items-center gap-3 sm:mx-8 rounded-lg border border-accent/40 bg-accent-soft/40 px-4 py-3">
      <CalendarCheck className="h-5 w-5 shrink-0 text-accent" />
      <p className="flex-1 text-sm text-ink-soft">
        Great, we&apos;ll be in touch to schedule a meeting.
      </p>
      {bookingUrl && (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("booking_clicked", { source: "chat" })}
          className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Book a time
        </a>
      )}
    </div>
  );
}

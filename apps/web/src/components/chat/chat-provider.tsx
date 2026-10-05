"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ChatMessage } from "@consultancy/shared";
import { useAnalytics } from "@/lib/analytics";
import { endChat, streamChatMessage } from "@/lib/api";
import { ChatModal } from "./chat-modal";
import { ChatLauncher } from "./chat-launcher";

export const CHAT_PROMPT_SEEN_KEY = "chat_prompt_seen";
export const CHAT_PROMPT_DELAY_MS = 1500;

export const CHAT_GREETING: ChatMessage = {
  role: "model",
  text: "Hi! I'm the AI assistant. Tell me a little about your business and what you'd like to improve, automate or build, and I'll let you know whether it's something we can help with.",
};

type ChatView = "intro" | "chat";
type EndStatus = "idle" | "sending" | "sent" | "error";

type ChatContextValue = {
  isOpen: boolean;
  view: ChatView;
  messages: ChatMessage[];
  isSending: boolean;
  /** Partial assistant reply while a response is streaming; null otherwise. */
  streamingText: string | null;
  error: string | null;
  meetingRequested: boolean;
  endStatus: EndStatus;
  hasUserMessages: boolean;
  openChat: (source?: string) => void;
  closeChat: () => void;
  startChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  finishChat: () => Promise<void>;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

function newSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { track } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ChatView>("intro");
  const [messages, setMessages] = useState<ChatMessage[]>([CHAT_GREETING]);
  const [isSending, setIsSending] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [meetingRequested, setMeetingRequested] = useState(false);
  const [endStatus, setEndStatus] = useState<EndStatus>("idle");

  const sessionIdRef = useRef<string>("");
  const endedRef = useRef(false);
  const sendingRef = useRef(false);
  const stateRef = useRef({ messages, meetingRequested });
  stateRef.current = { messages, meetingRequested };

  const hasUserMessages = messages.some((m) => m.role === "user");

  const getSessionId = useCallback(() => {
    if (!sessionIdRef.current) sessionIdRef.current = newSessionId();
    return sessionIdRef.current;
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CHAT_PROMPT_SEEN_KEY)) return;
      sessionStorage.setItem(CHAT_PROMPT_SEEN_KEY, "1");
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      setIsOpen(true);
      track("chat_prompt_shown");
    }, CHAT_PROMPT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [track]);

  const submitEnd = useCallback(async () => {
    const { messages: current, meetingRequested: meeting } = stateRef.current;
    if (endedRef.current || !current.some((m) => m.role === "user")) return;
    endedRef.current = true;
    setEndStatus("sending");
    const res = await endChat({
      sessionId: getSessionId(),
      messages: current,
      meetingRequested: meeting,
    });
    if (res.success) {
      setEndStatus("sent");
      track("chat_ended", { meeting: String(meeting) });
    } else {
      endedRef.current = false;
      setEndStatus("error");
    }
  }, [getSessionId, track]);

  useEffect(() => {
    const onPageHide = () => {
      void submitEnd();
    };
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [submitEnd]);

  const openChat = useCallback((source = "unknown") => {
    track("CTA_clicked", { source, action: "open_chat" });
    setIsOpen(true);
  }, [track]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    void submitEnd();
  }, [submitEnd]);

  const startChat = useCallback(() => {
    setView("chat");
    track("chat_started");
  }, [track]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sendingRef.current || endedRef.current) return;
      sendingRef.current = true;

      const next: ChatMessage[] = [
        ...stateRef.current.messages,
        { role: "user", text: trimmed },
      ];
      setMessages(next);
      setError(null);
      setIsSending(true);
      setStreamingText("");

      let reply = "";
      let finished = false;
      let failed: string | null = null;

      await streamChatMessage(
        { sessionId: getSessionId(), messages: next },
        (event) => {
          if (event.type === "delta") {
            reply += event.text;
            setStreamingText(reply);
          } else if (event.type === "done") {
            finished = true;
            if (event.meetingRequested && !stateRef.current.meetingRequested) {
              setMeetingRequested(true);
              track("chat_meeting_requested");
            }
          } else {
            failed = event.message;
          }
        },
      );

      const replyText = reply.trim();
      if (replyText && (finished || !failed)) {
        setMessages((prev) => [...prev, { role: "model", text: replyText }]);
      } else {
        setError(failed ?? "Our AI assistant couldn't respond. Please try again.");
      }
      setStreamingText(null);
      sendingRef.current = false;
      setIsSending(false);
    },
    [getSessionId, track],
  );

  const finishChat = useCallback(() => submitEnd(), [submitEnd]);

  const resetChat = useCallback(() => {
    sessionIdRef.current = newSessionId();
    endedRef.current = false;
    setMessages([CHAT_GREETING]);
    setMeetingRequested(false);
    setEndStatus("idle");
    setError(null);
    setView("chat");
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      view,
      messages,
      isSending,
      streamingText,
      error,
      meetingRequested,
      endStatus,
      hasUserMessages,
      openChat,
      closeChat,
      startChat,
      sendMessage,
      finishChat,
      resetChat,
    }),
    [
      isOpen,
      view,
      messages,
      isSending,
      streamingText,
      error,
      meetingRequested,
      endStatus,
      hasUserMessages,
      openChat,
      closeChat,
      startChat,
      sendMessage,
      finishChat,
      resetChat,
    ],
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
      <ChatModal />
      <ChatLauncher />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}

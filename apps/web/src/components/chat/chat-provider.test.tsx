import { act, render, screen } from "@testing-library/react";
import { AnalyticsProvider } from "@/lib/analytics";
import {
  CHAT_PROMPT_DELAY_MS,
  CHAT_PROMPT_SEEN_KEY,
  ChatProvider,
} from "@/components/chat/chat-provider";

jest.mock("@/lib/api", () => ({
  streamChatMessage: jest.fn(),
  endChat: jest.fn(),
}));

function renderChat() {
  return render(
    <AnalyticsProvider>
      <ChatProvider>
        <p>Page</p>
      </ChatProvider>
    </AnalyticsProvider>,
  );
}

describe("ChatProvider welcome prompt", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("opens the welcome modal on the first visit of a session", () => {
    renderChat();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(CHAT_PROMPT_DELAY_MS);
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Need help with your business?")).toBeInTheDocument();
    expect(sessionStorage.getItem(CHAT_PROMPT_SEEN_KEY)).toBe("1");
  });

  it("does not open again later in the same session", () => {
    sessionStorage.setItem(CHAT_PROMPT_SEEN_KEY, "1");
    renderChat();

    act(() => {
      jest.advanceTimersByTime(CHAT_PROMPT_DELAY_MS * 2);
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /chat with our ai assistant/i }),
    ).toBeInTheDocument();
  });
});

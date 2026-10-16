import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("shows a welcome toast (not a modal) on the first visit of a session", () => {
    renderChat();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(CHAT_PROMPT_DELAY_MS);
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "Need help with your business?",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(sessionStorage.getItem(CHAT_PROMPT_SEEN_KEY)).toBe("1");
  });

  it("can dismiss the welcome toast", async () => {
    renderChat();
    act(() => {
      jest.advanceTimersByTime(CHAT_PROMPT_DELAY_MS);
    });
    // Exit animation runs on requestAnimationFrame
    jest.useRealTimers();

    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));

    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the chat when starting from the toast", () => {
    renderChat();
    act(() => {
      jest.advanceTimersByTime(CHAT_PROMPT_DELAY_MS);
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /start chat/i }));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("AI business assistant")).toBeInTheDocument();
  });

  it("does not show again later in the same session", () => {
    sessionStorage.setItem(CHAT_PROMPT_SEEN_KEY, "1");
    renderChat();

    act(() => {
      jest.advanceTimersByTime(CHAT_PROMPT_DELAY_MS * 2);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /chat with our ai assistant/i }),
    ).toBeInTheDocument();
  });
});

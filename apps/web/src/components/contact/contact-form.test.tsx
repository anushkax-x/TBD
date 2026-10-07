import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactProvider } from "@/components/contact/contact-provider";
import { AnalyticsProvider } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";

jest.mock("@/lib/api", () => ({
  submitLead: jest.fn(),
}));

import { submitLead } from "@/lib/api";

const mockedSubmit = submitLead as jest.MockedFunction<typeof submitLead>;

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      <ContactProvider>{children}</ContactProvider>
    </AnalyticsProvider>
  );
}

function CtaProbe() {
  const { openContact, isOpen } = useContact();
  return (
    <div>
      <Button onClick={() => openContact("test")}>Book a Discovery Call</Button>
      {isOpen && <p>Modal open</p>}
    </div>
  );
}

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

describe("ContactForm", () => {
  beforeEach(() => {
    mockedSubmit.mockReset();
  });

  it("renders bare-minimum fields and date picker", () => {
    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date & time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date & time/i)).toHaveAttribute(
      "type",
      "date",
    );
  });

  it("shows time field after a date is selected", async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );
    await user.type(screen.getByLabelText(/Date & time/i), tomorrowIso());
    expect(screen.getByLabelText(/Choose a time/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty submit", async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );
    await user.click(screen.getByRole("button", { name: /Reserve my call/i }));
    await waitFor(() => {
      expect(screen.getByText("Pick a date")).toBeInTheDocument();
    });
    expect(mockedSubmit).not.toHaveBeenCalled();
  });

  it("submits successfully with date then time", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockResolvedValue({
      success: true,
      data: {
        id: "1",
        name: "Jane",
        businessName: "Not provided",
        email: "jane@acme.com",
        website: null,
        country: "Other",
        industry: null,
        improvement: "Cart recovery",
        message: null,
        preferredAt: new Date().toISOString(),
        source: "WEBSITE",
        status: "NEW",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );

    await user.type(screen.getByLabelText(/^Name$/i), "Jane");
    await user.type(screen.getByLabelText(/Work email/i), "jane@acme.com");
    await user.type(screen.getByLabelText(/Date & time/i), tomorrowIso());
    await user.type(screen.getByLabelText(/Choose a time/i), "10:00");
    await user.type(
      screen.getByLabelText(/What should we cover/i),
      "Cart recovery",
    );
    await user.click(screen.getByRole("button", { name: /Reserve my call/i }));

    await waitFor(() => {
      expect(screen.getByText(/You're on the list/i)).toBeInTheDocument();
    });
    expect(mockedSubmit).toHaveBeenCalled();
  });

  it("shows error state on API failure", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockResolvedValue({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Server unavailable" },
    });

    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );

    await user.type(screen.getByLabelText(/^Name$/i), "Jane");
    await user.type(screen.getByLabelText(/Work email/i), "jane@acme.com");
    await user.type(screen.getByLabelText(/Date & time/i), tomorrowIso());
    await user.type(screen.getByLabelText(/Choose a time/i), "14:00");
    await user.click(screen.getByRole("button", { name: /Reserve my call/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Server unavailable");
    });
  });
});

describe("CTA interactions", () => {
  it("opens contact modal from primary CTA", async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <CtaProbe />
      </Wrapper>,
    );
    await user.click(screen.getByRole("button", { name: /Book a Discovery Call/i }));
    expect(screen.getByText("Modal open")).toBeInTheDocument();
  });
});

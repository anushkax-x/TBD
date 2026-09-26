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

describe("ContactForm", () => {
  beforeEach(() => {
    mockedSubmit.mockReset();
  });

  it("renders required fields", () => {
    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/What would you like to improve/i),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty submit", async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>,
    );
    await user.click(screen.getByRole("button", { name: /Book a Discovery Call/i }));
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    expect(mockedSubmit).not.toHaveBeenCalled();
  });

  it("submits successfully", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockResolvedValue({
      success: true,
      data: {
        id: "1",
        name: "Jane",
        businessName: "Acme",
        email: "jane@acme.com",
        website: null,
        country: "United Kingdom",
        industry: "Recruitment",
        improvement: "Follow-ups",
        message: null,
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
    await user.type(screen.getByLabelText(/Business name/i), "Acme");
    await user.type(screen.getByLabelText(/^Email$/i), "jane@acme.com");
    await user.selectOptions(screen.getByLabelText(/Country/i), "United Kingdom");
    await user.type(
      screen.getByLabelText(/What would you like to improve/i),
      "Follow-ups",
    );
    await user.click(screen.getByRole("button", { name: /Book a Discovery Call/i }));

    await waitFor(() => {
      expect(screen.getByText(/we've received your enquiry/i)).toBeInTheDocument();
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
    await user.type(screen.getByLabelText(/Business name/i), "Acme");
    await user.type(screen.getByLabelText(/^Email$/i), "jane@acme.com");
    await user.selectOptions(screen.getByLabelText(/Country/i), "United Kingdom");
    await user.type(
      screen.getByLabelText(/What would you like to improve/i),
      "Follow-ups",
    );
    await user.click(screen.getByRole("button", { name: /Book a Discovery Call/i }));

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

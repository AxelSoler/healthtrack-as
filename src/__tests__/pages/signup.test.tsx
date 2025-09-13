import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignupPage from "@/app/signup/page";

// Mock dependencies
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: () => [null, jest.fn()],
}));

jest.mock("../../contexts/NotificationContext", () => ({
  useNotification: () => ({
    showNotification: jest.fn(),
  }),
}));

describe("SignupPage", () => {
  it("renders the signup form", () => {
    render(<SignupPage />);

    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });
});

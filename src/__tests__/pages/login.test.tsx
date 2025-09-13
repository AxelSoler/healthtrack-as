import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";

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

describe("LoginPage", () => {
  it("renders the login form", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });
});


import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SubmitButton } from "@/components/buttons/SubmitButton";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

describe("SubmitButton", () => {
  it("renders children when not pending", () => {
    (require("react-dom").useFormStatus as jest.Mock).mockReturnValue({
      pending: false,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders loading indicator when pending", () => {
    (require("react-dom").useFormStatus as jest.Mock).mockReturnValue({
      pending: true,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByText("❤️")).toBeInTheDocument();
  });

  it("disables button when pending", () => {
    (require("react-dom").useFormStatus as jest.Mock).mockReturnValue({
      pending: true,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not disable button when not pending", () => {
    (require("react-dom").useFormStatus as jest.Mock).mockReturnValue({
      pending: false,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});

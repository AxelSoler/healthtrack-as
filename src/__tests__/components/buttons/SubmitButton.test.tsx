import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { useFormStatus } from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

const useFormStatusMock = useFormStatus as jest.Mock;

describe("SubmitButton", () => {
  it("renders children when not pending", () => {
    useFormStatusMock.mockReturnValue({
      pending: false,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders loading indicator when pending", () => {
    useFormStatusMock.mockReturnValue({
      pending: true,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByText("❤️")).toBeInTheDocument();
  });

  it("disables button when pending", () => {
    useFormStatusMock.mockReturnValue({
      pending: true,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not disable button when not pending", () => {
    useFormStatusMock.mockReturnValue({
      pending: false,
    });
    render(<SubmitButton>Test</SubmitButton>);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
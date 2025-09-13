
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import Notification from "@/components/notifications/Notification";

jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  motion: {
    div: ({ layout, ...props }: any) => <div {...props} />,
  },
}));

describe("Notification", () => {
  jest.useFakeTimers();
  const onClose = jest.fn();

  afterEach(() => {
    onClose.mockClear();
  });

  it("renders the message and has the correct background color for success type", () => {
    render(
      <Notification
        message="Success message"
        type="success"
        onClose={onClose}
      />
    );
    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("bg-green-500");
  });

  it("renders the message and has the correct background color for warning type", () => {
    render(
      <Notification
        message="Warning message"
        type="warning"
        onClose={onClose}
      />
    );
    expect(screen.getByText("Warning message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("bg-yellow-500");
  });

  it("renders the message and has the correct background color for error type", () => {
    render(
      <Notification message="Error message" type="error" onClose={onClose} />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("bg-red-500");
  });

  it("calls onClose after the duration", () => {
    render(
      <Notification
        message="Test message"
        type="success"
        onClose={onClose}
        duration={5000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

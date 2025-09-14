import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock the SignOutButton component
jest.mock("../../../components/buttons/SignOutButton", () => ({
  SignOutButton: () => <button>Sign Out</button>,
}));

describe("Header", () => {
  it("should render the header with title, navigation links, and sign out button", () => {
    render(<Header />);

    // Check for the title
    const title = screen.getByText("HealthTrack");
    expect(title).toBeInTheDocument();

    // Check for navigation links
    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");

    const goalsLink = screen.getByRole("link", { name: "Goals" });
    expect(goalsLink).toBeInTheDocument();
    expect(goalsLink).toHaveAttribute("href", "/goals");

    const feedbackLink = screen.getByRole("link", { name: "Feedback" });
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveAttribute("href", "/feedback");

    // Check for the sign out button
    const signOutButton = screen.getByRole("button", { name: "Sign Out" });
    expect(signOutButton).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock the SignOutButton component
jest.mock("../../../components/buttons/SignOutButton", () => ({
  SignOutButton: () => <button>Sign Out</button>,
}));

describe("Header", () => {
  it("should render the header with title, navigation links, and sign out button on desktop", () => {
    render(<Header />);

    // Check for the title
    const title = screen.getByText("HealthTrack");
    expect(title).toBeInTheDocument();

    // Check for navigation links
    const nav = screen.getAllByRole('navigation')[0];
    const dashboardLink = within(nav).getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");

    const goalsLink = within(nav).getByRole("link", { name: "Goals" });
    expect(goalsLink).toBeInTheDocument();
    expect(goalsLink).toHaveAttribute("href", "/goals");

    const feedbackLink = within(nav).getByRole("link", { name: "Feedback" });
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveAttribute("href", "/feedback");

    // Check for the sign out button
    const signOutButton = screen.getByRole("button", { name: "Sign Out" });
    expect(signOutButton).toBeInTheDocument();
  });

  it("should show mobile menu on button click", () => {
    render(<Header />);

    // Find and click the menu button
    const menuButton = screen.getByTestId("menu-icon");
    fireEvent.click(menuButton);

    // Check for navigation links in mobile menu
    const mobileMenu = screen.getAllByRole('navigation')[1];
    const dashboardLink = within(mobileMenu).getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toBeInTheDocument();

    const goalsLink = within(mobileMenu).getByRole("link", { name: "Goals" });
    expect(goalsLink).toBeInTheDocument();

    const feedbackLink = within(mobileMenu).getByRole("link", { name: "Feedback" });
    expect(feedbackLink).toBeInTheDocument();

    // Check for the sign out button in mobile menu
    const signOutButton = within(mobileMenu).getByRole("button", { name: "Sign Out" });
    expect(signOutButton).toBeInTheDocument();
  });
});


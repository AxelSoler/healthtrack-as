import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Home page", () => {
  beforeEach(() => {
    render(<Page />);
  });

  it("renders the main heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Welcome to HEALTH TRACK - AS");
  });

  it("renders the introductory paragraph", () => {
    const paragraph = screen.getByText(
      /Your personal health tracking app\. Monitor your well-being and stay on top of your health goals with ease\./i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('renders the "Create account" link', () => {
    const createAccountLink = screen.getByRole("link", {
      name: /create account/i,
    });
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute("href", "/signup");
  });

  it('renders the "Login" link', () => {
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});

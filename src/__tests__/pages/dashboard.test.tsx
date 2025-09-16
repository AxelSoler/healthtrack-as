import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Mock NotificationContext to avoid loading ESM dependencies (e.g. nanoid) during test startup
jest.mock("../../contexts/NotificationContext", () => ({
  useNotification: () => ({
    showNotification: jest.fn(),
  }),
}));

// The dashboard page imports server utilities to fetch user and metrics.
// We'll mock the server client to return a user and optional metrics.
jest.mock("../../utils/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(async () => ({ data: { user: { id: "user-1" } } })),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn(async () => ({ data: [] })),
    })),
  })),
}));

// Mock MetricChart to avoid rendering heavy recharts in the page render.
jest.mock("../../components/charts/MetricChart", () => ({
  MetricChart: ({ metrics }: { metrics: { created_at: string; weight?: number | null }[] }) => (
    <div data-testid="metric-chart">MetricChart mock ({metrics?.length ?? 0})</div>
  ),
}));

// Mock SignOutButton to simplify the snapshot
jest.mock("../../components/buttons/SignOutButton", () => ({
  SignOutButton: () => <button>Logout</button>,
}));

// Mock next/navigation redirect so page.tsx can import it safely
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import Dashboard from "@/app/dashboard/page";

describe("Dashboard page (simple)", () => {
  it("renders header, and Your Metrics heading", async () => {
    const jsx = await Dashboard();
    const { findByText } = render(jsx as unknown as React.ReactElement);

    // Header title
    expect(await findByText(/HealthTrack/i)).toBeInTheDocument();

    // Your Metrics heading
    expect(await findByText(/Your Metrics/i)).toBeInTheDocument();
  });

  it("shows empty state when there are no metrics", async () => {
    const jsx = await Dashboard();
    render(jsx as unknown as React.ReactElement);

    expect(
      await screen.findByText("You haven't logged any metrics yet.")
    ).toBeInTheDocument();
  });
});

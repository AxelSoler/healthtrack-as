
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MetricChart } from "@/components/charts/MetricChart";

jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
  LineChart: ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>,
  CartesianGrid: () => <g />,
  XAxis: () => <g />,
  YAxis: () => <g />,
  Tooltip: () => <g />,
  Line: () => <g />,
}));

describe("MetricChart", () => {
  it('renders "No weight data" message when no weight data is available', () => {
    render(<MetricChart metrics={[]} />);
    expect(
      screen.getByText("No weight data available to display chart.")
    ).toBeInTheDocument();
  });

  it("renders the chart when weight data is available", () => {
    const metrics = [
      {
        id: "1",
        created_at: new Date().toISOString(),
        user_id: "1",
        weight: 70,
      },
    ];
    const { container } = render(<MetricChart metrics={metrics} />);
    expect(screen.queryByText("No weight data available to display chart.")).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

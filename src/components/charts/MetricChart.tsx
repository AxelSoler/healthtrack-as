"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Metric {
  id: string;
  created_at: string;
  user_id: string;
  weight?: number;
  blood_pressure?: string;
  sleep_hours?: number;
}

interface MetricChartProps {
  metrics: Metric[];
}

export const MetricChart = ({ metrics }: MetricChartProps) => {
  // Sort metrics by date in ascending order for the chart
  const sortedMetrics = [...metrics].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Filter out metrics without weight for the weight chart
  const weightData = sortedMetrics
    .filter((metric) => metric.weight !== undefined && metric.weight !== null)
    .map((metric) => ({
      date: new Date(metric.created_at).toLocaleDateString(),
      weight: metric.weight,
    }));

  if (weightData.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-8">
        No weight data available to display chart.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300} className="my-2">
      <LineChart
        data={weightData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

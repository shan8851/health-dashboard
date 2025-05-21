"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface IActivityChartProps {
  chartData: {
    name: string;
    id: string;
    date: Date | string;
    duration: number;
  }[];
}

export const ActivityTypeChart = ({ chartData }: IActivityChartProps) => {
  const aggregated = Object.values(
    chartData.reduce<Record<string, { name: string; total: number }>>(
      (acc, curr) => {
        if (!acc[curr.name]) {
          acc[curr.name] = { name: curr.name, total: 0 };
        }
        acc[curr.name].total += curr.duration;
        return acc;
      },
      {},
    ),
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={aggregated}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} unit=" min" />
        <Tooltip cursor={{ fill: "hsl(var(--muted))" }} />
        <Bar dataKey="total" fill="#38bdf8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

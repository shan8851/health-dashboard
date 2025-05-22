import { format } from "date-fns";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RouterOutputs } from "~/trpc/react";

type ActivityLog = RouterOutputs["activity"]["getAll"]["data"][number];

export interface IActivityDurationChartProps {
  chartData: ActivityLog[];
}

export const ActivityDurationChart = ({
  chartData,
}: IActivityDurationChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData.map((entry) => ({
          date: format(new Date(entry.date), "dd/MM"),
          duration: entry.duration,
        }))}
      >
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} unit=" min" />
        <Tooltip cursor={{ fill: "hsl(var(--muted))" }} />
        <Area
          type="monotone"
          dataKey="duration"
          stroke="#60a5fa"
          fill="#3b82f6"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

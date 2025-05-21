import { format } from "date-fns";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface IActivityDurationChartProps {
  chartData: {
    name: string;
    id: string;
    date: Date | string;
    duration: number;
  }[];
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

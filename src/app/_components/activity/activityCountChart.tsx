"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type DonutData = {
  name: string;
  count: number;
}[];

const COLORS = [
  "#60a5fa", // blue
  "#facc15", // yellow
  "#f87171", // red
  "#34d399", // green
  "#a78bfa", // violet
];

export const ActivityCountChart = ({
  data,
  total,
}: {
  data: DonutData;
  total: number;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="count"
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-xl font-bold"
        >
          {total}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

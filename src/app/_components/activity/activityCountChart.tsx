"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PIE_CHART_COLORS } from "~/constants";

type DonutData = {
  name: string;
  count: number;
}[];

interface IActivityCountChartProps {
  data: DonutData;
  total: number;
}

export const ActivityCountChart: React.FC<IActivityCountChartProps> = ({
  data,
  total,
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
            <Cell
              key={`cell-${i}`}
              fill={PIE_CHART_COLORS[i % PIE_CHART_COLORS.length]}
            />
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

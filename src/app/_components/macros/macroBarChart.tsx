"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type RouterOutputs } from "~/trpc/react";

type MacroLog = RouterOutputs["macro"]["getAll"]["data"][number];

type Props = {
  data: MacroLog[];
};

export function MacroBarChart({ data }: Props) {
  const chartData = data.map((log) => ({
    date: new Date(log.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    }),
    protein: log.protein,
    carbs: log.carbs,
    fats: log.fats,
  }));

  return (
    <Card className="bg-muted/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Macro Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip wrapperClassName="text-xs" />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="protein"
              stackId="a"
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="carbs"
              stackId="a"
              fill="#22c55e"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="fats"
              stackId="a"
              fill="#eab308"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

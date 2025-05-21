import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface IWeightChartProps {
  chartData: {
    date: string;
    weight: number;
  }[];
}

export const WeightChart: React.FC<IWeightChartProps> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="date" stroke="#888888" fontSize={12} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          domain={["dataMin - 1", "dataMax + 1"]}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="weight"
          stroke="#4f46e5"
          fill="#6366f1"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

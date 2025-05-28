import { WEIGHT_TARGET } from "~/constants";

export const getWeightTrend = (
  current: number,
  previous?: number,
): {
  emoji: string;
  color: string;
} => {
  if (previous === undefined) return { emoji: "✅", color: "text-foreground" };
  if (current < previous) return { emoji: "⬇️", color: "text-green-500" };
  if (current > previous) return { emoji: "⬆️", color: "text-red-500" };
  return { emoji: "✅", color: "text-yellow-500" };
};

export const getWeightIndicator = (weight: number) => {
  const min = WEIGHT_TARGET.min;
  const max = WEIGHT_TARGET.max;

  if (weight < min) return "⬇️";
  if (weight > max) return "⚠️";
  return "✅";
};

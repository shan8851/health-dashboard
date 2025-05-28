import { CALORIE_TARGET, PROTEIN_TARGET } from "~/constants";

export const getCalorieIndicator = (calories: number) => {
  const min = CALORIE_TARGET.min;
  const max = CALORIE_TARGET.max;

  if (calories < min) return "⬇️";
  if (calories > max) return "⚠️";
  return "✅";
};

export const getProteinIndicator = (protein: number) => {
  const min = PROTEIN_TARGET.min;
  const max = PROTEIN_TARGET.max;

  if (protein < min) return "⬇️";
  if (protein > max) return "⚠️";
  return "✅";
};

export const getMacroColor = (
  value: number,
  { min, max }: { min: number; max: number },
): string => {
  if (value < min) return "text-red-500"; // too low
  if (value > max) return "text-yellow-400"; // too high
  return "text-green-500"; // just right
};

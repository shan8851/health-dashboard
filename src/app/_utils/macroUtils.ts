export const getCalorieIndicator = (calories: number) => {
  const min = 1600;
  const max = 2200;

  if (calories < min) return "⬇️";
  if (calories > max) return "⚠️";
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

export const getCalorieIndicator = (calories: number) => {
  const min = 1600;
  const max = 2200;

  if (calories < min) return "⬇️";
  if (calories > max) return "⚠️";
  return "✅";
};

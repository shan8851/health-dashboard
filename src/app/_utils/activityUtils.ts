export const getActivityIcon = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("football")) return "⚽";
  if (lower.includes("squash")) return "🏓";
  if (lower.includes("run")) return "🏃";
  if (lower.includes("gym") || lower.includes("lift")) return "🏋️";
  return "🏃";
};

export const getDurationColor = (duration: number): string => {
  if (duration < 30) return "text-red-500";
  if (duration <= 60) return "text-yellow-500";
  return "text-green-500";
};

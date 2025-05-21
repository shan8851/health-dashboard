type MacroTrafficLightProps = {
  protein: number;
  carbs: number;
  fats: number;
};

const getColor = (
  value: number,
  { min, max }: { min: number; max: number },
): string => {
  if (value < min) return "text-red-500"; // too low
  if (value > max) return "text-yellow-400"; // too high
  return "text-green-500"; // just right
};

export function MacroTrafficLight({
  protein,
  carbs,
  fats,
}: MacroTrafficLightProps) {
  const proteinTarget = { min: 160, max: 999 };
  const carbTarget = { min: 80, max: 160 };
  const fatTarget = { min: 50, max: 80 };

  return (
    <div className="mt-1 flex flex-wrap gap-x-4 text-lg">
      <span className={getColor(protein, proteinTarget)}>
        <span className="text-muted-foreground text-sm">PROTEIN:</span>{" "}
        {protein}g
      </span>
      <span className={getColor(carbs, carbTarget)}>
        <span className="text-muted-foreground text-sm">CARBS:</span> {carbs}g
      </span>
      <span className={getColor(fats, fatTarget)}>
        <span className="text-muted-foreground text-sm">FATS:</span> {fats}g
      </span>
    </div>
  );
}

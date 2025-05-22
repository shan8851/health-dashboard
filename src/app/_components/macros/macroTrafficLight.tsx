import { getMacroColor } from "~/app/_utils/macroUtils";
import { CARB_TARGET, FAT_TARGET, PROTEIN_TARGET } from "~/constants";

interface IMacroTrafficLightProps {
  protein: number;
  carbs: number;
  fats: number;
}

export const MacroTrafficLight: React.FC<IMacroTrafficLightProps> = ({
  protein,
  carbs,
  fats,
}) => {
  return (
    <div className="mt-1 flex flex-wrap gap-x-4 text-lg">
      <span className={getMacroColor(protein, PROTEIN_TARGET)}>
        <span className="text-muted-foreground text-sm">PROTEIN:</span>{" "}
        {protein}g
      </span>
      <span className={getMacroColor(carbs, CARB_TARGET)}>
        <span className="text-muted-foreground text-sm">CARBS:</span> {carbs}g
      </span>
      <span className={getMacroColor(fats, FAT_TARGET)}>
        <span className="text-muted-foreground text-sm">FATS:</span> {fats}g
      </span>
    </div>
  );
};

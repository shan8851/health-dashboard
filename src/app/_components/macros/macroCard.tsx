import { format } from "date-fns";
import { getCalorieIndicator } from "~/app/_utils/macroUtils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MacroTrafficLight } from "./macroTrafficLight";

export interface IMacroCardProps {
  log: {
    protein: number;
    carbs: number;
    fats: number;
    id: number;
    date: Date;
    calories: number;
  };
}

export const MacroCard: React.FC<IMacroCardProps> = ({ log }) => {
  const calorieIndicator = getCalorieIndicator(log.calories);
  return (
    <Card className="bg-muted/10">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          {calorieIndicator} {log.calories} kcal
        </CardTitle>
        <span className="text-muted-foreground text-xs">
          {format(new Date(log.date), "dd/MM/yyyy")}
        </span>
      </CardHeader>
      <CardContent>
        <MacroTrafficLight
          protein={log.protein}
          carbs={log.carbs}
          fats={log.fats}
        />
      </CardContent>
    </Card>
  );
};

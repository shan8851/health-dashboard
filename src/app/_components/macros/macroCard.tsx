import { format } from "date-fns";
import { getCalorieIndicator } from "~/app/_utils/macroUtils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { RouterOutputs } from "~/trpc/react";
import { MacroTrafficLight } from "./macroTrafficLight";

type MacroLog = RouterOutputs["macro"]["getAll"]["data"][number];

interface IMacroCardProps {
  log: MacroLog;
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

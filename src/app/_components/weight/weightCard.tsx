import { format } from "date-fns";
import { getWeightTrend } from "~/app/_utils/weightUtils";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";

export interface IWeightCardProps {
  prev?: {
    id: number;
    date: Date;
    weight: number;
  };
  log: {
    id: number;
    date: Date;
    weight: number;
  };
}

export const WeightCard: React.FC<IWeightCardProps> = ({ prev, log }) => {
  const { emoji, color } = getWeightTrend(log.weight, prev?.weight);
  return (
    <Card className="bg-muted/10">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className={`text-base font-semibold ${color}`}>
          {log.weight} kg {emoji}
        </CardTitle>
        <span className="text-muted-foreground text-xs">
          {format(new Date(log.date), "dd/MM/yyyy")}
        </span>
      </CardHeader>
    </Card>
  );
};

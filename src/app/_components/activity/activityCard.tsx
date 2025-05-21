import { format } from "date-fns";
import { getActivityIcon, getDurationColor } from "~/app/_utils/activityUtils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export interface IActivityCardProps {
  log: {
    name: string;
    id: string;
    date: Date;
    duration: number;
  };
}

export const ActivityCard: React.FC<IActivityCardProps> = ({ log }) => {
  const icon = getActivityIcon(log.name);
  const durationColor = getDurationColor(log.duration);
  return (
    <Card key={log.id} className="bg-muted/10">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          <span className="mr-2">{icon}</span>
          {log.name}
        </CardTitle>
        <span className="text-muted-foreground text-xs">
          {format(new Date(log.date), "dd/MM/yyyy")}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Duration:{" "}
          <span className={`text-foreground font-semibold ${durationColor}`}>
            {log.duration} min
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { api } from "~/trpc/react";

type Range = "7d" | "30d" | "90d";

export const SummaryStats = () => {
  const [range, setRange] = useState<Range>("7d");

  const { data, isLoading } = api.summary.get.useQuery(
    { range },
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  const rangeLabelMap: Record<Range, string> = {
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    "90d": "Last 90 days",
  };

  const items = data
    ? [
        { label: "Avg Weight", value: `${data.avgWeight.toFixed(1)} kg` },
        { label: "Avg Calories", value: `${data.avgCalories.toFixed(0)} kcal` },
        { label: "Avg Protein", value: `${data.avgProtein.toFixed(0)} g` },
        { label: "Activities", value: data.totalActivities.toString() },
        { label: "Total Activity", value: `${data.totalActivityMinutes} min` },
      ]
    : [];

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium tracking-wide">
          {rangeLabelMap[range]}
        </span>
        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(val) => val && setRange(val as Range)}
          className="gap-1"
        >
          <ToggleGroupItem value="7d">7d</ToggleGroupItem>
          <ToggleGroupItem value="30d">30d</ToggleGroupItem>
          <ToggleGroupItem value="90d">90d</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[80px] w-full rounded-md" />
            ))
          : items.map((item) => (
              <Card
                key={item.label}
                className="bg-muted/10 border-border p-4 text-center"
              >
                <CardContent className="flex flex-col items-center justify-center gap-1">
                  <span className="text-muted-foreground text-xs tracking-wide uppercase">
                    {item.label}
                  </span>
                  <span className="text-foreground text-xl font-semibold">
                    {item.value}
                  </span>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

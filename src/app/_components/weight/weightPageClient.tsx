"use client";

import { format } from "date-fns";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { Paginator } from "../application/paginator";
import { WeightCard } from "./weightCard";
import { WeightChart } from "./weightChart";

const ITEMS_PER_PAGE = 5;

export const WeightPageClient = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = api.weight.getAll.useQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

  const logs = data?.data ?? [];
  const pageCount = data?.totalPages ?? 1;

  const chartData = logs
    .slice()
    .reverse()
    .map((entry) => ({
      date: format(new Date(entry.date), "dd/MM"),
      weight: entry.weight,
      id: entry.id,
    }));

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">All Weight Logs</h1>

      <Card className="bg-muted/10">
        <CardHeader>
          <CardTitle>Weight Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <WeightChart chartData={chartData} />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Skeleton className="h-[160px] w-full rounded-md" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {logs.map((log) => (
              <WeightCard key={log.id} log={log} />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Paginator
              page={page}
              pageCount={pageCount}
              onOpenChangeAction={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

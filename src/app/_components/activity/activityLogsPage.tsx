"use client";

import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { Paginator } from "../application/paginator";
import { ActivityCard } from "./activityCard";
import { ActivityCountChart } from "./activityCountChart";
import { ActivityDurationChart } from "./activityDurationChart";
import { ActivityTypeChart } from "./activityTypeChart";

const ITEMS_PER_PAGE = 5;

export const ActivityLogsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = api.activity.getAll.useQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

  const logs = data?.data ?? [];
  const pageCount = data?.totalPages ?? 1;

  const fullActivityList = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Prepare donut chart data
  const groupedByType = fullActivityList.reduce<Record<string, number>>(
    (acc, curr) => {
      acc[curr.name] = (acc[curr.name] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const donutData = Object.entries(groupedByType).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">All Activities</h1>

      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Activity Over Time</h2>
            <div className="bg-muted/10 h-[300px] w-full overflow-hidden rounded-md p-4">
              <ActivityDurationChart chartData={fullActivityList} />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Time by Activity Type</h2>
            <div className="bg-muted/10 h-[300px] w-full overflow-hidden rounded-md p-4">
              <ActivityTypeChart chartData={fullActivityList} />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Sessions by Type</h2>
            <div className="bg-muted/10 relative h-[300px] w-full overflow-hidden rounded-md p-4">
              <ActivityCountChart
                data={donutData}
                total={data?.data.length ?? 0}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-[160px] w-full rounded-md" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {logs.map((log) => (
              <ActivityCard key={log.id} log={log} />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Paginator
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

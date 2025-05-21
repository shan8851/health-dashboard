"use client";

import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { Paginator } from "../application/paginator";
import { MacroBarChart } from "./macroBarChart";
import { MacroCard } from "./macroCard";

const ITEMS_PER_PAGE = 5;

export const MacroLogsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = api.macro.getAll.useQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

  const logs = data?.data ?? [];
  const pageCount = data?.totalPages ?? 1;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">All Macro Logs</h1>

      <MacroBarChart data={logs} />

      {isLoading ? (
        <Skeleton className="h-[160px] w-full rounded-md" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {logs.map((log) => (
              <MacroCard key={log.id} log={log} />
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

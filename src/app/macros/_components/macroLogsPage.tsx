"use client";

import { format } from "date-fns";
import { useState } from "react";
import { MacroTrafficLight } from "~/app/_components/macros/macroTrafficLight";
import { getCalorieIndicator } from "~/app/_utils/getCalorieIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { MacroBarChart } from "./macroBarChart";

const ITEMS_PER_PAGE = 10;

export default function MacroLogsPage() {
  const [page, setPage] = useState(1);
  const { data = [], isLoading } = api.macro.getAll.useQuery();

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginated = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">All Macro Logs</h1>
      <MacroBarChart data={data} />
      {isLoading && <Skeleton className="h-[160px] w-full rounded-md" />}
      {!isLoading && (
        <>
          {" "}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginated.map((log) => (
              <Card key={log.id} className="bg-muted/10">
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {getCalorieIndicator(log.calories)} {log.calories} kcal
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
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => Math.max(prev - 1, 1));
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: pageCount }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => Math.min(prev + 1, pageCount));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}

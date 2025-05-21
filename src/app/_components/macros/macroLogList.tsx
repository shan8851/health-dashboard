"use client";

import { useState } from "react";
import { getCalorieIndicator } from "~/app/_utils/getCalorieIndicator";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { EmptyList } from "../application/emptyList";
import { LoadingSpinner } from "../application/loadingSpinner";
import MacroLogForm from "./macroLogForm";
import { MacroTrafficLight } from "./macroTrafficLight";

export default function MacroLogList() {
  const [open, setOpen] = useState(false);

  const { data: logs = [], isLoading } = api.macro.getAll.useQuery();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-primary text-lg font-semibold">Recent Macros</h3>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              Log Macros
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Macro Entry</DialogTitle>
            </DialogHeader>
            <MacroLogForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && logs.length === 0 && <EmptyList />}
      {!isLoading && logs.length > 0 && (
        <ul className="space-y-2 overflow-y-auto pr-1">
          {logs.map((log) => (
            <li
              key={log.id}
              className="border-border bg-muted/10 rounded-md border p-3 text-sm"
            >
              <div className="mb-2 flex items-start justify-between">
                <span className="text-foreground text-xl">
                  {getCalorieIndicator(log.calories)} {log.calories} kcal
                </span>
                <span className="text-muted-foreground text-xs">
                  {new Date(log.date).toLocaleDateString("en-GB")}
                </span>
              </div>

              <MacroTrafficLight
                protein={log.protein}
                carbs={log.carbs}
                fats={log.fats}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
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
import { MacroCard } from "./macroCard";
import { MacroLogForm } from "./macroLogForm";

export const MacroLogList = () => {
  const [open, setOpen] = useState(false);

  const { data: logs = [], isLoading } = api.macro.getLatest.useQuery();

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
        <div className="space-y-2 overflow-y-auto pr-1">
          {logs.map((log) => (
            <MacroCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
};

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
import { WeightCard } from "./weightCard";
import WeightLogForm from "./weightLossForm";

export default function WeightLogList() {
  const [open, setOpen] = useState(false);

  const { data: logs = [], isLoading } = api.weight.getLatest.useQuery();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-primary text-lg font-semibold">Recent Logs</h3>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              Log Weight
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Weight Entry</DialogTitle>
            </DialogHeader>
            <WeightLogForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && logs.length === 0 && <EmptyList />}
      {!isLoading && logs.length > 0 && (
        <div className="space-y-2 overflow-y-auto pr-1">
          {logs.map((log, i) => {
            const prev = logs[i + 1];

            return <WeightCard key={log.id} prev={prev} log={log} />;
          })}
        </div>
      )}
    </div>
  );
}

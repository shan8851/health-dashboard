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
import { ActivityCard } from "./activityCard";
import { ActivityLogForm } from "./activityLogForm";

export const ActivityLogList = () => {
  const [open, setOpen] = useState(false);

  const { data: logs = [], isLoading } = api.activity.getLatest.useQuery();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-primary text-lg font-semibold">
          Recent Activities
        </h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Log Activity</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Activity Entry</DialogTitle>
            </DialogHeader>
            <ActivityLogForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && logs.length === 0 && <EmptyList />}
      {logs.length > 0 && (
        <div className="space-y-2 overflow-y-auto pr-1">
          {logs.map((log) => (
            <ActivityCard log={log} key={log.id} />
          ))}
        </div>
      )}
    </div>
  );
};

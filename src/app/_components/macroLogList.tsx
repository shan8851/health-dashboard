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
import type { RouterOutputs } from "~/trpc/react";
import MacroLogForm from "./macroLogForm";

type MacroLogs = RouterOutputs["macro"]["getAll"];

type Props = {
  initialLogs: MacroLogs;
};

export default function MacroLogList({ initialLogs }: Props) {
  const [open, setOpen] = useState(false);

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

      <ul className="space-y-2 overflow-y-auto pr-1">
        {initialLogs.map((log) => (
          <li
            key={log.id}
            className="border-border bg-muted/10 rounded-md border p-3 text-sm"
          >
            <div className="text-muted-foreground text-xs">
              {new Date(log.date).toLocaleDateString("en-GB")}
            </div>
            <div className="text-foreground text-base">
              <strong>{log.calories} kcal</strong> – P: {log.protein}g, C:{" "}
              {log.carbs}g, F: {log.fats}g
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

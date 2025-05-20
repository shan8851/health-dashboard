"use client";

import type { RouterOutputs } from "~/trpc/react";

type MacroLogs = RouterOutputs["macro"]["getAll"];

type Props = {
  initialLogs: MacroLogs;
};

export default function MacroLogList({ initialLogs }: Props) {
  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-semibold">Recent Macro Entries</h3>
      <ul className="space-y-2">
        {initialLogs.map((log) => (
          <li key={log.id} className="rounded border p-3">
            <div className="text-sm text-gray-500">
              {new Date(log.date).toLocaleDateString()}
            </div>
            <div className="text-base">
              <strong>{log.calories} kcal</strong> – P: {log.protein}g, C:{" "}
              {log.carbs}g, F: {log.fats}g
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

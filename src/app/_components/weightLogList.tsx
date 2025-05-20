"use client";

import type { RouterOutputs } from "~/trpc/react";

type Props = {
  initialLogs: RouterOutputs["weight"]["getAll"];
};

export default function WeightLogList({ initialLogs }: Props) {
  return (
    <ul className="space-y-2">
      {initialLogs.map((log) => (
        <li key={log.id} className="rounded border p-2">
          {new Date(log.date).toLocaleDateString()} —{" "}
          <strong>{log.weight} kg</strong>
        </li>
      ))}
    </ul>
  );
}

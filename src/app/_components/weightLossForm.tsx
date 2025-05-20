"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function WeightLogForm() {
  const [value, setValue] = useState("");
  const utils = api.useUtils();

  const mutation = api.weight.add.useMutation({
    onSuccess: async () => {
      await utils.weight.getAll.invalidate();
      setValue("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const num = parseFloat(value);
        if (!isNaN(num)) mutation.mutate({ weight: num });
      }}
      className="flex items-center gap-4"
    >
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Weight in kg"
        className="rounded border p-2"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {mutation.isPending ? "Saving..." : "Add Entry"}
      </button>
    </form>
  );
}

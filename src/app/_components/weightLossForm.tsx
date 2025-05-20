"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export default function WeightLogForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [value, setValue] = useState("");
  const utils = api.useUtils();

  const mutation = api.weight.add.useMutation({
    onSuccess: async () => {
      await utils.weight.getAll.invalidate();
      setValue("");
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = parseFloat(value);
    if (!isNaN(num)) mutation.mutate({ weight: num });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Weight in kg"
        className="bg-background text-foreground"
      />

      <Button type="submit" disabled={mutation.isPending} variant="default">
        {mutation.isPending ? "Saving..." : "Add Entry"}
      </Button>
    </form>
  );
}

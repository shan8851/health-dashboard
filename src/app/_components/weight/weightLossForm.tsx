"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface IWeightLogFormProps {
  onSuccess?: () => void;
}

export const WeightLogForm: React.FC<IWeightLogFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    weight: "",
    date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
  });

  const utils = api.useUtils();

  const mutation = api.weight.add.useMutation({
    onSuccess: async () => {
      await utils.weight.getAll.invalidate();
      setForm({ weight: "", date: new Date().toISOString().split("T")[0] });
      toast.success("Weight logged", {
        description: `${form.weight} kg on ${form.date}`,
      });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = parseFloat(form.weight);
    const parsedDate = form.date ? new Date(form.date) : new Date();

    if (!isNaN(num)) {
      mutation.mutate({ weight: num, date: parsedDate });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="number"
        value={form.weight}
        onChange={(e) => setForm({ ...form, weight: e.target.value })}
        placeholder="Weight in kg"
        className="bg-background text-foreground"
      />
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="bg-background text-foreground"
      />
      <Button type="submit" disabled={mutation.isPending} variant="default">
        {mutation.isPending ? "Saving..." : "Add Entry"}
      </Button>
    </form>
  );
};

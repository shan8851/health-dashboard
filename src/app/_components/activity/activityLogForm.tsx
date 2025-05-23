"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface IActivityLogFormProps {
  onSuccess?: () => void;
}

export const ActivityLogForm: React.FC<IActivityLogFormProps> = ({
  onSuccess,
}) => {
  const [form, setForm] = useState({
    name: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
  });

  const utils = api.useUtils();
  const mutation = api.activity.add.useMutation({
    onSuccess: async () => {
      await utils.activity.getAll.invalidate();
      await utils.activity.getLatest.invalidate();
      await utils.summary.get.invalidate();
      setForm({
        name: "",
        duration: "",
        date: new Date().toISOString().split("T")[0],
      });
      toast.success("Activity logged", {
        description: `${form.name} for ${form.duration} min on ${form.date}`,
      });
      onSuccess?.();
    },
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      duration: parseInt(form.duration),
      date: form.date ? new Date(form.date) : new Date(),
    };
    if (!payload.name || isNaN(payload.duration)) return;
    mutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-3"
    >
      <Input
        placeholder="Activity (e.g. Football)"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="bg-background text-foreground"
      />
      <Input
        type="number"
        placeholder="Duration (min)"
        value={form.duration}
        onChange={(e) => handleChange("duration", e.target.value)}
        className="bg-background text-foreground"
      />
      <Input
        type="date"
        value={form.date}
        onChange={(e) => handleChange("date", e.target.value)}
        className="bg-background text-foreground"
      />
      <Button type="submit" disabled={mutation.isPending} variant="default">
        {mutation.isPending ? "Saving..." : "Add Activity"}
      </Button>
    </form>
  );
};

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export default function MacroLogForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    date: new Date().toISOString().split("T")[0],
  });

  const utils = api.useUtils();
  const macroMutation = api.macro.add.useMutation({
    onSuccess: async () => {
      await utils.macro.getAll.invalidate();
      setForm({
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        date: new Date().toISOString().split("T")[0],
      });
      toast.success("Macros logged", {
        description: `${form.calories} calories on ${form.date}`,
      });
      onSuccess?.();
    },
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      calories: parseInt(form.calories),
      protein: parseInt(form.protein),
      carbs: parseInt(form.carbs),
      fats: parseInt(form.fats),
      date: form.date ? new Date(form.date) : new Date(),
    };

    if (Object.values(payload).some((v) => typeof v === "number" && isNaN(v)))
      return;

    macroMutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-3"
    >
      {(["calories", "protein", "carbs", "fats"] as const).map((key) => (
        <Input
          key={key}
          type="number"
          value={form[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="bg-background text-foreground"
        />
      ))}

      <Input
        type="date"
        value={form.date}
        onChange={(e) => handleChange("date", e.target.value)}
        className="bg-background text-foreground"
      />

      <Button
        type="submit"
        disabled={macroMutation.isPending}
        variant="default"
      >
        {macroMutation.isPending ? "Saving..." : "Add Macros"}
      </Button>
    </form>
  );
}

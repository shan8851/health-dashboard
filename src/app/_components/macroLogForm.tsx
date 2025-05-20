"use client";

import { useState } from "react";
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
  });

  const utils = api.useUtils();
  const macroMutation = api.macro.add.useMutation({
    onSuccess: async () => {
      await utils.macro.getAll.invalidate();
      setForm({ calories: "", protein: "", carbs: "", fats: "" });
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
    };

    if (Object.values(payload).some(isNaN)) return;

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

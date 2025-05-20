"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function MacroLogForm() {
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
    },
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const payload = {
          calories: parseInt(form.calories),
          protein: parseInt(form.protein),
          carbs: parseInt(form.carbs),
          fats: parseInt(form.fats),
        };

        if (Object.values(payload).some(isNaN)) return;

        macroMutation.mutate(payload);
      }}
      className="flex max-w-sm flex-col gap-3"
    >
      {(["calories", "protein", "carbs", "fats"] as const).map((key) => (
        <input
          key={key}
          type="number"
          value={form[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder={key}
          className="rounded border p-2"
        />
      ))}

      <button
        type="submit"
        disabled={macroMutation.isPending}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        {macroMutation.isPending ? "Saving..." : "Add Macros"}
      </button>
    </form>
  );
}

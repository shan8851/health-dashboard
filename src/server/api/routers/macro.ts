import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const macroRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.macroLog.findMany({
      orderBy: { date: "desc" },
      take: 30,
    });
  }),

  add: publicProcedure
    .input(
      z.object({
        calories: z.number(),
        protein: z.number(),
        carbs: z.number(),
        fats: z.number(),
        date: z
          .date()
          .optional()
          .default(() => new Date()),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.macroLog.create({
        data: {
          calories: input.calories,
          protein: input.protein,
          carbs: input.carbs,
          fats: input.fats,
          date: input.date ?? new Date(),
        },
      });
    }),
});

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
        calories: z.number().int().min(0),
        protein: z.number().int().min(0),
        carbs: z.number().int().min(0),
        fats: z.number().int().min(0),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.macroLog.create({ data: input });
    }),
});

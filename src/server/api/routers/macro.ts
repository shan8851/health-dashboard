import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const macroRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(10),
        })
        .optional(),
    )
    .query(async ({ input, ctx }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 10;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        ctx.db.macroLog.findMany({
          orderBy: { date: "desc" },
          skip,
          take: limit,
        }),
        ctx.db.macroLog.count(),
      ]);

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getLatest: publicProcedure
    .input(z.number().min(1).max(50).default(10))
    .query(({ input, ctx }) => {
      return ctx.db.macroLog.findMany({
        orderBy: { date: "desc" },
        take: input,
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

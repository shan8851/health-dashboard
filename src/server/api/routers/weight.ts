import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const weightRouter = createTRPCRouter({
  // Get latest X logs (default 10)
  getLatest: publicProcedure
    .input(
      z.object({ limit: z.number().min(1).max(100).optional() }).optional(),
    )
    .query(async ({ input, ctx }) => {
      const limit = input?.limit ?? 10;

      return ctx.db.weightLog.findMany({
        orderBy: { date: "desc" },
        take: limit,
      });
    }),

  // Get all logs with pagination
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;

      const [total, data] = await Promise.all([
        ctx.db.weightLog.count(),
        ctx.db.weightLog.findMany({
          orderBy: { date: "desc" },
          take: limit,
          skip,
        }),
      ]);

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),

  // Add a new weight entry
  add: publicProcedure
    .input(
      z.object({
        weight: z.number().gt(0),
        date: z
          .date()
          .optional()
          .default(() => new Date()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.weightLog.create({
        data: {
          weight: input.weight,
          date: input.date ?? new Date(),
        },
      });
    }),
});

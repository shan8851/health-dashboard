import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const activityRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(10),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 10;

      const [total, data] = await Promise.all([
        ctx.db.activityLog.count(),
        ctx.db.activityLog.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { date: "desc" },
        }),
      ]);

      return {
        data,
        page,
        total,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getLatest: publicProcedure
    .input(
      z.object({ count: z.number().min(1).max(50).default(10) }).optional(),
    )
    .query(({ ctx, input }) => {
      return ctx.db.activityLog.findMany({
        orderBy: { date: "desc" },
        take: input?.count ?? 10,
      });
    }),

  add: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        duration: z.number().min(1),
        date: z
          .date()
          .optional()
          .default(() => new Date()),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.activityLog.create({
        data: {
          name: input.name,
          duration: input.duration,
          date: input.date ?? new Date(),
        },
      });
    }),
});

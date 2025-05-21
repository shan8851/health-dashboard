import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const activityRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.activityLog.findMany({
      orderBy: { date: "desc" },
      take: 30,
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

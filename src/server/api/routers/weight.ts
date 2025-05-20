import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const weightRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.weightLog.findMany({
      orderBy: { date: "desc" },
      take: 30,
    });
  }),

  add: publicProcedure
    .input(z.object({ weight: z.number().gt(0) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.weightLog.create({
        data: { weight: input.weight },
      });
    }),
});

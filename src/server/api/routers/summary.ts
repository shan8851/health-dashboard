// src/server/api/routers/summary.ts
import { subDays } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const timeWindowMap = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
} as const;

export const summaryRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ range: z.enum(["7d", "30d", "90d"]).default("7d") }))
    .query(async ({ input, ctx }) => {
      const fromDate = subDays(new Date(), timeWindowMap[input.range]);

      const [weight, macro, activity] = await Promise.all([
        ctx.db.weightLog.aggregate({
          _avg: { weight: true },
          where: { date: { gte: fromDate } },
        }),
        ctx.db.macroLog.aggregate({
          _avg: { calories: true, protein: true },
          where: { date: { gte: fromDate } },
        }),
        ctx.db.activityLog.aggregate({
          _count: true,
          _sum: { duration: true },
          where: { date: { gte: fromDate } },
        }),
      ]);

      return {
        avgWeight: weight._avg.weight ?? 0,
        avgCalories: macro._avg.calories ?? 0,
        avgProtein: macro._avg.protein ?? 0,
        totalActivities: activity._count ?? 0,
        totalActivityMinutes: activity._sum.duration ?? 0,
      };
    }),
});

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
      const days = timeWindowMap[input.range];
      const fromDate = subDays(new Date(), days);
      const previousFromDate = subDays(fromDate, days);

      const [current, previous] = await Promise.all([
        Promise.all([
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
        ]),
        Promise.all([
          ctx.db.weightLog.aggregate({
            _avg: { weight: true },
            where: { date: { gte: previousFromDate, lt: fromDate } },
          }),
          ctx.db.macroLog.aggregate({
            _avg: { calories: true, protein: true },
            where: { date: { gte: previousFromDate, lt: fromDate } },
          }),
          ctx.db.activityLog.aggregate({
            _count: true,
            _sum: { duration: true },
            where: { date: { gte: previousFromDate, lt: fromDate } },
          }),
        ]),
      ]);

      const [currWeight, currMacro, currActivity] = current;
      const [prevWeight, prevMacro, prevActivity] = previous;

      const calculateChange = (curr: number, prev: number) => {
        if (!prev || !isFinite(prev)) return null;
        return ((curr - prev) / prev) * 100;
      };

      return {
        avgWeight: currWeight._avg.weight ?? 0,
        avgCalories: currMacro._avg.calories ?? 0,
        avgProtein: currMacro._avg.protein ?? 0,
        totalActivities: currActivity._count ?? 0,
        totalActivityMinutes: currActivity._sum.duration ?? 0,

        // Comparison deltas
        deltaWeight: calculateChange(
          currWeight._avg.weight ?? 0,
          prevWeight._avg.weight ?? 0,
        ),
        deltaCalories: calculateChange(
          currMacro._avg.calories ?? 0,
          prevMacro._avg.calories ?? 0,
        ),
        deltaProtein: calculateChange(
          currMacro._avg.protein ?? 0,
          prevMacro._avg.protein ?? 0,
        ),
        deltaActivities: calculateChange(
          currActivity._count ?? 0,
          prevActivity._count ?? 0,
        ),
        deltaActivityMinutes: calculateChange(
          currActivity._sum.duration ?? 0,
          prevActivity._sum.duration ?? 0,
        ),
      };
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type GitHubPushEvent = {
  type: "PushEvent";
  created_at: string;
  repo: { name: string };
  payload: {
    commits: { sha: string; message: string }[];
  };
};

export const githubRouter = createTRPCRouter({
  sync: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).optional() }))
    .mutation(async ({ input, ctx }) => {
      const res = await fetch(
        `https://api.github.com/users/${env.GITHUB_USERNAME}/events`,
        {
          headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            "User-Agent": "T3-Dashboard",
            Accept: "application/vnd.github+json",
          },
        },
      );

      if (!res.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to fetch GitHub events",
        });
      }

      const events = (await res.json()) as unknown[];

      const commits = events
        .filter((e): e is GitHubPushEvent => e.type === "PushEvent")
        .flatMap((e) =>
          e.payload.commits.map((c) => ({
            id: c.sha,
            repo: e.repo.name,
            message: c.message,
            date: new Date(e.created_at),
          })),
        );

      await ctx.db.gitHubCommit.createMany({
        data: commits,
        //skipDuplicates: true,
      });

      const latest = await ctx.db.gitHubCommit.findMany({
        orderBy: { date: "desc" },
        take: input?.limit ?? 20,
      });

      return latest;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.gitHubCommit.findMany({
      orderBy: { date: "desc" },
      take: 30,
    });
  }),
});

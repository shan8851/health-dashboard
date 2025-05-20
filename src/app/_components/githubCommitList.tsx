"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function GitHubCommitList() {
  const {
    data: commits,
    refetch,
    isLoading,
    isError,
  } = api.github.getAll.useQuery(undefined, {
    refetchOnMount: true,
  });

  const { mutate: syncCommits, isPending } = api.github.sync.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-primary text-lg font-semibold">Recent Commits</h3>
        <Button
          onClick={() => syncCommits({ limit: 50 })}
          disabled={isPending}
          size="sm"
        >
          {isPending ? "Syncing..." : "Sync Commits"}
        </Button>
      </div>

      {isLoading && (
        <p className="text-muted-foreground text-sm">Loading commits...</p>
      )}
      {isError && (
        <p className="text-destructive text-sm">Failed to load commits.</p>
      )}
      {commits?.length === 0 && !isLoading && (
        <p className="text-muted-foreground text-sm">No commits found.</p>
      )}

      <ul className="space-y-3 overflow-y-auto pr-1">
        {commits?.map((commit) => (
          <li
            key={commit.id}
            className="border-border bg-muted/10 rounded-md border p-3"
          >
            <div className="text-muted-foreground text-xs">
              {new Date(commit.date).toLocaleString("en-GB")}
            </div>
            <div className="text-accent font-mono text-sm">{commit.repo}</div>
            <div className="text-foreground text-base">{commit.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

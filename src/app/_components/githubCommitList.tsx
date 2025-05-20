"use client";

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
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent GitHub Commits</h2>
        <button
          onClick={() => syncCommits({ limit: 50 })}
          disabled={isPending}
          className="rounded bg-purple-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Syncing..." : "Sync Commits"}
        </button>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading commits...</p>}
      {isError && (
        <p className="text-sm text-red-500">Failed to load commits.</p>
      )}

      {commits?.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500">No commits found.</p>
      )}

      <ul className="space-y-3">
        {commits?.map((commit) => (
          <li key={commit.id} className="rounded border p-3">
            <div className="text-xs text-gray-500">
              {new Date(commit.date).toLocaleString()}
            </div>
            <div className="font-mono text-sm">{commit.repo}</div>
            <div className="text-base">{commit.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

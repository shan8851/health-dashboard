import { type RouterOutputs } from "~/trpc/react";
import { api, HydrateClient } from "~/trpc/server";
import GitHubCommitList from "./_components/githubCommitList";
import MacroLogList from "./_components/macroLogList";
import WeightLogList from "./_components/weightLogList";

type WeightLogs = RouterOutputs["weight"]["getAll"];
type MacroLogs = RouterOutputs["macro"]["getAll"];

export default async function Home() {
  const [weightLogs, macroLogs]: [WeightLogs, MacroLogs] = await Promise.all([
    api.weight.getAll(),
    api.macro.getAll(),
  ]);

  return (
    <HydrateClient>
      <main className="bg-background text-foreground p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Column 1: Weight */}
          <section className="border-border bg-card flex max-h-[400px] flex-col overflow-hidden rounded-md border p-4 shadow-sm">
            <h2 className="text-primary mb-2 text-lg font-semibold">
              Weight Tracker
            </h2>
            <div className="scrollbar-thin scrollbar-thumb-muted flex-1 overflow-y-auto">
              <WeightLogList initialLogs={weightLogs} />
            </div>
          </section>

          {/* Column 2: Macros */}
          <section className="border-border bg-card flex max-h-[400px] flex-col overflow-hidden rounded-md border p-4 shadow-sm">
            <h2 className="text-primary mb-2 text-lg font-semibold">
              Macro Tracker
            </h2>
            <div className="scrollbar-thin scrollbar-thumb-muted flex-1 overflow-y-auto">
              <MacroLogList initialLogs={macroLogs} />
            </div>
          </section>

          {/* Column 3: GitHub */}
          <section className="border-border bg-card flex max-h-[400px] flex-col overflow-hidden rounded-md border p-4 shadow-sm">
            <h2 className="text-primary mb-2 text-lg font-semibold">
              GitHub Commits
            </h2>
            <div className="scrollbar-thin scrollbar-thumb-muted flex-1 overflow-y-auto">
              <GitHubCommitList />
            </div>
          </section>
        </div>
      </main>
    </HydrateClient>
  );
}

import { type RouterOutputs } from "~/trpc/react";
import { api, HydrateClient } from "~/trpc/server";
import GitHubCommitList from "./_components/githubCommitList";
import MacroLogForm from "./_components/macroLogForm";
import MacroLogList from "./_components/macroLogList";
import WeightLogList from "./_components/weightLogList";
import WeightLogForm from "./_components/weightLossForm";

type WeightLogs = RouterOutputs["weight"]["getAll"];
type MacroLogs = RouterOutputs["macro"]["getAll"];

export default async function Home() {
  const [weightLogs, macroLogs]: [WeightLogs, MacroLogs] = await Promise.all([
    api.weight.getAll(),
    api.macro.getAll(),
  ]);

  return (
    <HydrateClient>
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-bold">My Dashboard</h1>

        <section className="mb-10">
          <h2 className="mb-2 text-xl font-semibold">Weight Tracker</h2>
          <WeightLogForm />
          <WeightLogList initialLogs={weightLogs} />
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Macro Tracker</h2>
          <MacroLogForm />
          <MacroLogList initialLogs={macroLogs} />
        </section>
        <section>
          <GitHubCommitList />
        </section>
      </main>
    </HydrateClient>
  );
}

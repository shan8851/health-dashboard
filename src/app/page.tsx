import { HydrateClient } from "~/trpc/server";
import ActivityLogList from "./_components/activity/activityLogList";
import MacroLogList from "./_components/macros/macroLogList";
import SummaryStats from "./_components/summary/summaryStats";
import WeightLogList from "./_components/weight/weightLogList";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="bg-background text-foreground p-6">
        <SummaryStats />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <section className="border-border bg-card flex h-[400px] flex-col overflow-hidden rounded-md border p-4 shadow-sm">
            <h2 className="text-primary mb-2 text-lg font-semibold">
              Weight Tracker
            </h2>
            <div className="scrollbar-hide flex-1 overflow-y-auto">
              <WeightLogList />
            </div>
          </section>
          <section className="border-border bg-card flex h-[400px] flex-col overflow-hidden rounded-md border p-4 shadow-sm">
            <h2 className="text-primary mb-2 text-lg font-semibold">
              Macro Tracker
            </h2>
            <div className="scrollbar-hide flex-1 overflow-y-auto">
              <MacroLogList />
            </div>
          </section>
          <section className="border-border bg-card flex h-[400px] flex-col overflow-hidden rounded-md border p-4 shadow-sm">
            <h2 className="text-primary mb-2 text-lg font-semibold">
              Activity Tracker
            </h2>
            <div className="scrollbar-hide flex-1 overflow-y-auto">
              <ActivityLogList />
            </div>
          </section>
        </div>
      </main>
    </HydrateClient>
  );
}

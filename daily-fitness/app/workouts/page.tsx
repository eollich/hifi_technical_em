"use client";

import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import AddWorkoutModal from "@/components/AddWorkoutModal";
import { useWorkoutStore } from "@/lib/workout-store";

export default function WorkoutsPage() {
  const { workouts } = useWorkoutStore();

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <h3 className="mb-3 text-lg font-semibold">Workouts</h3>

        <div className="grid gap-3">
          {workouts.map((w) => (
            <Card key={w.id} className="transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <div className="font-semibold">{w.name}</div>
                <div className="text-sm text-muted-foreground">
                  {w.routine.name} • weight {w.weight}
                </div>
              </CardContent>
            </Card>
          ))}
          {workouts.length === 0 && (
            <div className="text-sm text-muted-foreground">No workouts yet. Add one!</div>
          )}
        </div>
      </main>

      <AddWorkoutModal/>
    </div>
  );
}

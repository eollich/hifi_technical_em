"use client";

import * as React from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useWorkoutStore } from "@/lib/workout-store";

function toEmbedUrl(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getWorkout, updateWorkoutWeight } = useWorkoutStore();

  const w = getWorkout(params.id);
  if (!w) {
    notFound();
  }
  const workout = w!;
  const routine = workout.routine;

  const [idx, setIdx] = React.useState(0);
  const current = routine.list[idx];

  const repCount = current?.reps ?? 3;
  const [repChecks, setRepChecks] = React.useState<boolean[]>(
    () => Array(repCount).fill(false)
  );

  React.useEffect(() => {
    const count = routine.list[idx]?.reps ?? 3;
    setRepChecks(Array(count).fill(false));
  }, [idx, routine.list]);

  const allChecked = repChecks.every(Boolean);
  const toggleRep = (i: number) =>
    setRepChecks((prev) => {
      const n = [...prev];
      n[i] = !n[i];
      return n;
    });

  function next() {
    if (idx < routine.list.length - 1) {
      setIdx(idx + 1);
      window.scrollTo(0, 0);
    } else {
      updateWorkoutWeight(workout.id, workout.weight + 5);
      router.push("/workouts");
    }
  }

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {routine.list.map((_, i) => (
            <span
              key={i}
              className={`grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold ${
                i === idx
                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                  : "bg-muted text-foreground/70"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* exercise */}
        <div className="mb-3 rounded-lg border bg-card p-3">
          <div className="text-sm text-muted-foreground">Exercise</div>
          <div className="font-semibold">{current.exercise.name}</div>
        </div>

        {/* video */}
        <div className="mb-3 rounded-lg border bg-card p-3">
          <div className="text-sm text-muted-foreground">Video</div>
          <iframe
            className="mt-2 aspect-video w-full rounded-md"
            src={toEmbedUrl(current.exercise.video)}
            title={current.exercise.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* weight */}
        <div className="mb-3 rounded-lg border bg-card p-3">
          Weight: <span className="font-semibold">{workout.weight}</span> →{" "}
          <span className="font-semibold">{workout.weight + 5}</span>
        </div>

        {/* reps */}
        <div className="mb-3">
          <div className="mb-2 font-semibold">Reps</div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: repCount }).map((_, i) => (
              <label
                key={i}
                className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={repChecks[i] ?? false}
                  onChange={() => toggleRep(i)}
                />
                <span>Rep {i + 1}</span>
              </label>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/workouts")}>
            Back
          </Button>
          <Button onClick={next} disabled={!allChecked}>
            {idx < routine.list.length - 1 ? "Next Exercise" : "Finish Workout"}
          </Button>
        </div>
      </main>
    </div>
  );
}

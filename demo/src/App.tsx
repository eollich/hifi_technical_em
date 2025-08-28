import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import FooterTabs from "./components/FooterTabs";
import RoutinesView from "./views/RoutinesView";
import WorkoutsView from "./views/WorkoutsView";
import SessionView from "./views/SessionView";
import { sampleRoutines } from "./data/sample";
import { loadWorkouts, saveWorkouts } from "./storage";
import type { Workout } from "./types";

export default function App(): React.ReactElement {
  const [tab, setTab] = useState<"routines" | "workouts" | "session">("routines");
  const [workouts, setWorkouts] = useState<Workout[]>(loadWorkouts());
  const [sessionIdx, setSessionIdx] = useState<number | null>(null);

  function highestPrevWeightForRoutine(routineName: string): number {
    let max = -Infinity;
    for (const w of workouts) {
      if (w.routine.name === routineName) max = Math.max(max, w.weight);
    }
    return Number.isFinite(max) ? max : 10; // fallback to 10 if no history
  }

  function addWorkout(w: Workout){
    const startWeight = highestPrevWeightForRoutine(w.routine.name);
    const next = [...workouts, { ...w, weight: startWeight }];
    setWorkouts(next); saveWorkouts(next);
    // optionally start session immediately:
    setSessionIdx(next.length - 1);
    setTab("session");
  }

  function replaceWorkoutAt(idx: number, w: Workout){
    const next = workouts.map((x,i)=> i===idx ? w : x);
    setWorkouts(next); saveWorkouts(next);
  }

  function importAll(arr: Workout[]){
    setWorkouts(arr); saveWorkouts(arr);
  }

  const currentWorkout = useMemo(
    ()=> sessionIdx != null ? workouts[sessionIdx] : null,
    [sessionIdx, workouts]
  );

  return (
    <div>
      <Header />
      <main style={{padding:"10px 12px 80px"}}>
        {tab==="routines" && <RoutinesView routines={sampleRoutines} />}

        {tab==="workouts" && (
          <WorkoutsView
            workouts={workouts}
            routines={sampleRoutines}
            onAdd={addWorkout}
            onStart={(idx)=>{ setSessionIdx(idx); setTab("session"); }}
            onImport={importAll}
          />
        )}

        {tab==="session" && currentWorkout && (
          <SessionView
            workout={currentWorkout}
            onComplete={(newWeight)=>{
              // save weight +5 and return to workouts
              replaceWorkoutAt(sessionIdx as number, { ...currentWorkout, weight: newWeight });
              setSessionIdx(null);
              setTab("workouts");
            }}
            onCancel={()=>{ setSessionIdx(null); setTab("workouts"); }}
          />
        )}
      </main>
      <FooterTabs active={tab==="session" ? "workouts" : tab as "routines"|"workouts"} onSelect={setTab} />
    </div>
  );
}

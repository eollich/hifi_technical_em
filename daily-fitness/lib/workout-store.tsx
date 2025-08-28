"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { Routine, Workout } from "./types";

type Ctx = {
  workouts: Workout[];
  addWorkout: (name: string, routine: Routine) => Workout;
  updateWorkoutWeight: (id: string, newWeight: number) => void;
  getWorkout: (id: string) => Workout | undefined;
  highestPrevForRoutine: (routineName: string) => number;
};

const WorkoutContext = createContext<Ctx | null>(null);
const idGen = () => Math.random().toString(36).slice(2, 10);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  function highestPrevForRoutine(routineName: string) {
    const weights = workouts.filter(w => w.routine.name === routineName).map(w => w.weight);
    return weights.length ? Math.max(...weights) : 10;
  }

  function addWorkout(name: string, routine: Routine): Workout {
    const start = highestPrevForRoutine(routine.name);
    const w: Workout = { id: idGen(), name, routine, weight: start };
    setWorkouts(prev => [...prev, w]);
    return w;
  }

  function updateWorkoutWeight(id: string, newWeight: number) {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, weight: newWeight } : w));
  }

  function getWorkout(id: string) {
    return workouts.find(w => w.id === id);
  }

  const value = useMemo(() => ({
    workouts,
    addWorkout,
    updateWorkoutWeight,
    getWorkout,
    highestPrevForRoutine,
  }), [workouts]);

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkoutStore() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkoutStore must be used within WorkoutProvider");
  return ctx;
}

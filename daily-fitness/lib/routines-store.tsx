"use client";

import * as React from "react";
import { sampleRoutines } from "./sample";
import type { Routine } from "./types";

/** Internal shapes with stable ids so keys don’t jump around */
export type RoutineItemWithId = {
  id: string;
  reps: number;
  exercise: { name: string; category: string; video: string };
};

export type RoutineWithId = {
  id: string;
  name: string;
  list: RoutineItemWithId[];
};

const uid = () => Math.random().toString(36).slice(2, 10);

function initFromSample(): RoutineWithId[] {
  return sampleRoutines.map((r) => ({
    id: uid(),
    name: r.name,
    list: r.list.map((it) => ({
      id: uid(),
      reps: it.reps,
      exercise: { ...it.exercise },
    })),
  }));
}

/** Convert our id-ful internal shape to your original Routine (id-less) */
export function toRoutine(r: RoutineWithId): Routine {
  return {
    name: r.name,
    list: r.list.map((it) => ({
      reps: it.reps,
      exercise: { ...it.exercise },
    })),
  };
}

type Ctx = {
  routines: RoutineWithId[];
  addRoutine: (name: string) => RoutineWithId;
  renameRoutine: (id: string, newName: string) => void;
  addExercise: (routineId: string) => void;
  removeExercise: (routineId: string, itemId: string) => void;
  updateExerciseField: (
    routineId: string,
    itemId: string,
    field: "name" | "category" | "video",
    value: string
  ) => void;
  updateExerciseReps: (routineId: string, itemId: string, reps: number) => void;
  getRoutineById: (id: string) => RoutineWithId | undefined;
};

const RoutinesContext = React.createContext<Ctx | null>(null);

export function RoutinesProvider({ children }: { children: React.ReactNode }) {
  const [routines, setRoutines] = React.useState<RoutineWithId[]>(() => initFromSample());

  const addRoutine = (name: string) => {
    const r: RoutineWithId = { id: uid(), name, list: [] };
    setRoutines((prev) => [...prev, r]);
    return r;
  };

  const renameRoutine = (id: string, newName: string) => {
    setRoutines((prev) => prev.map((r) => (r.id === id ? { ...r, name: newName } : r)));
  };

  const addExercise = (routineId: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id !== routineId
          ? r
          : {
              ...r,
              list: [
                ...r.list,
                {
                  id: uid(),
                  reps: 3,
                  exercise: { name: "", category: "", video: "" },
                },
              ],
            }
      )
    );
  };

  const removeExercise = (routineId: string, itemId: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id !== routineId ? r : { ...r, list: r.list.filter((it) => it.id !== itemId) }
      )
    );
  };

  const updateExerciseField: Ctx["updateExerciseField"] = (routineId, itemId, field, value) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id !== routineId
          ? r
          : {
              ...r,
              list: r.list.map((it) =>
                it.id !== itemId ? it : { ...it, exercise: { ...it.exercise, [field]: value } }
              ),
            }
      )
    );
  };

  const updateExerciseReps: Ctx["updateExerciseReps"] = (routineId, itemId, reps) => {
    const safe = Math.max(1, Math.min(50, Math.floor(reps || 1)));
    setRoutines((prev) =>
      prev.map((r) =>
        r.id !== routineId
          ? r
          : {
              ...r,
              list: r.list.map((it) => (it.id !== itemId ? it : { ...it, reps: safe })),
            }
      )
    );
  };

  const getRoutineById = (id: string) => routines.find((r) => r.id === id);

  const value: Ctx = {
    routines,
    addRoutine,
    renameRoutine,
    addExercise,
    removeExercise,
    updateExerciseField,
    updateExerciseReps,
    getRoutineById,
  };

  return <RoutinesContext.Provider value={value}>{children}</RoutinesContext.Provider>;
}

export function useRoutinesStore() {
  const ctx = React.useContext(RoutinesContext);
  if (!ctx) throw new Error("useRoutinesStore must be used within RoutinesProvider");
  return ctx;
}

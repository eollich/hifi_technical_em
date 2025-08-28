import type { Workout } from "./types";

const KEY = "df_workouts_v1";

export function loadWorkouts(): Workout[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Workout[]; }
  catch { return []; }
}

export function saveWorkouts(arr: Workout[]): void {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

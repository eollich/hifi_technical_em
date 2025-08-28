export type Exercise = { name: string; video: string; category: string };
export type RoutineItem = { exercise: Exercise; reps: number };
export type Routine = { name: string; list: RoutineItem[] };
export type Workout = { name: string; routine: Routine; weight: number };

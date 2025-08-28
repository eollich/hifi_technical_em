import type { Exercise, Routine } from "../types";

const ex: Exercise[] = [
  { name: "Push-ups", video: "https://www.youtube.com/embed/5rIqP63yWFg", category: "upper" },
  { name: "Squats",   video: "https://example.com/squats",  category: "lower" },
  { name: "Plank",    video: "https://example.com/plank",   category: "core"  },
];

export const sampleRoutines: Routine[] = [
  { name: "Full Body", list: [
    { exercise: ex[0], reps: 3 },
    { exercise: ex[1], reps: 3 },
    { exercise: ex[2], reps: 3 },
  ]},
  { name: "Upper Focus", list: [
    { exercise: ex[0], reps: 3 },
    { exercise: ex[2], reps: 3 },
  ]},
];

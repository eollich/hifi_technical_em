import type { Exercise, Routine } from "./types";

const ex: Exercise[] = [
  {
    name: "Push-ups",
    video: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
    category: "upper",
  },
  {
    name: "Squats",
    video: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
    category: "lower",
  },
  {
    name: "Plank",
    video: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    category: "core",
  },
];

export const sampleRoutines: Routine[] = [
  {
    name: "Full Body",
    list: [
      { exercise: ex[0], reps: 3 },
      { exercise: ex[1], reps: 3 },
      { exercise: ex[2], reps: 3 },
    ],
  },
  {
    name: "Upper Focus",
    list: [
      { exercise: ex[0], reps: 3 },
      { exercise: ex[2], reps: 3 },
    ],
  },
  {
    name: "Leg Day",
    list: [
      { exercise: ex[1], reps: 3 },
      { exercise: ex[1], reps: 3 },
      { exercise: ex[1], reps: 3 },
    ],
  },
];

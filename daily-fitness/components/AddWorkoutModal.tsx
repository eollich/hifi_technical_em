"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleRoutines } from "@/lib/sample";
import { useWorkoutStore } from "@/lib/workout-store";

export default function AddWorkoutModal() {
  const router = useRouter();
  const { addWorkout } = useWorkoutStore();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [routineIdx, setRoutineIdx] = React.useState("0");

  function onCreate() {
    if (!name.trim()) return;
    const routine = sampleRoutines[parseInt(routineIdx, 10)];
    const w = addWorkout(name.trim(), routine);
    setOpen(false);
    setName("");
    setRoutineIdx("0");
    router.push(`/session/${w.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Floating + button (raise above footer with z-50) */}
        <Button
          className="fixed right-5 bottom-24 z-50 h-12 w-12 rounded-full text-xl shadow-lg"
          aria-label="Add Workout"
        >
          +
        </Button>
      </DialogTrigger>

      {/* shadcn DialogContent already uses z-50, but the class below keeps it explicit */}
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>New Workout</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="grid gap-1">
            <label className="text-sm">Workout name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Push Day"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm">Routine</label>
            <Select value={routineIdx} onValueChange={setRoutineIdx}>
              <SelectTrigger>
                <SelectValue placeholder="Select routine" />
              </SelectTrigger>
              <SelectContent>
                {sampleRoutines.map((r, i) => (
                  <SelectItem key={r.name} value={String(i)}>
                    {r.name} ({r.list.length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onCreate}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

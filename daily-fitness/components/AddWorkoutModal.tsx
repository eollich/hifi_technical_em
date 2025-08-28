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
import { useWorkoutStore } from "@/lib/workout-store";
import { useRoutinesStore, toRoutine } from "@/lib/routines-store";

export default function AddWorkoutModal() {
  const router = useRouter();
  const { addWorkout } = useWorkoutStore();
  const { routines } = useRoutinesStore(); // ← live routines from the store

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [routineIdx, setRoutineIdx] = React.useState("0");

  // Keep selection valid if routines list changes (e.g., you added one on Routines tab)
  React.useEffect(() => {
    const idx = parseInt(routineIdx, 10);
    if (!routines.length) {
      setRoutineIdx("");
      return;
    }
    if (!Number.isFinite(idx) || idx < 0 || idx >= routines.length) {
      setRoutineIdx("0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routines.length]);

  function onCreate() {
    if (!name.trim()) return;
    const idx = parseInt(routineIdx, 10);
    if (!Number.isFinite(idx) || idx < 0 || idx >= routines.length) return;

    const chosen = routines[idx];
    const w = addWorkout(name.trim(), toRoutine(chosen)); // convert store shape → Routine
    setOpen(false);
    setName("");
    setRoutineIdx("0");
    router.push(`/session/${w.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Floating + button (above footer) */}
        <Button
          type="button"
          className="fixed right-5 bottom-24 z-50 h-12 w-12 rounded-full text-xl shadow-lg"
          aria-label="Add Workout"
        >
          +
        </Button>
      </DialogTrigger>

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
            <Select value={routineIdx} onValueChange={setRoutineIdx} disabled={!routines.length}>
              <SelectTrigger>
                <SelectValue placeholder={routines.length ? "Select routine" : "No routines available"} />
              </SelectTrigger>
              <SelectContent>
                {routines.map((r, i) => (
                  <SelectItem key={r.id} value={String(i)}>
                    {r.name} ({r.list.length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onCreate} disabled={!name.trim() || !routines.length}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

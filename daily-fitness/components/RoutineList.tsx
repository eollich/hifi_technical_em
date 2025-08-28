"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRoutinesStore } from "@/lib/routines-store";

export default function RoutineList() {
  const {
    routines,
    addRoutine,
    renameRoutine,
    addExercise,
    removeExercise,
    updateExerciseField,
    updateExerciseReps,
  } = useRoutinesStore();

  const [openId, setOpenId] = React.useState<string | null>(null);

  const [addOpen, setAddOpen] = React.useState(false);
  const [newRoutineName, setNewRoutineName] = React.useState("");

  const openRoutine = (id: string) => setOpenId(id);
  const closeRoutine = () => setOpenId(null);

  function onCreateRoutine() {
    const name = newRoutineName.trim();
    if (!name) return;
    const r = addRoutine(name);
    setAddOpen(false);
    setNewRoutineName("");
    setTimeout(() => openRoutine(r.id), 0);
  }

  return (
    <>
      <div className="grid gap-3">
        {routines.map((r) => {
          const isOpen = openId === r.id;
          return (
            <Dialog key={r.id} open={isOpen} onOpenChange={(o) => setOpenId(o ? r.id : null)}>
              <DialogTrigger asChild>
                <Card
                  className="transition-colors hover:bg-muted/50 cursor-pointer"
                  onClick={() => openRoutine(r.id)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.list.length} {r.list.length === 1 ? "exercise" : "exercises"}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    <div className="grid gap-1">
                      <label className="text-xs text-muted-foreground">Routine name</label>
                      <Input
                        value={r.name}
                        onChange={(e) => renameRoutine(r.id, e.target.value)}
                        placeholder="e.g., Push / Pull / Legs"
                      />
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                  {r.list.length === 0 && (
                    <div className="text-sm text-muted-foreground">No exercises yet. Add one below.</div>
                  )}

                  {r.list.map((item, idx) => (
                    <div key={item.id} className="rounded-md border p-3 bg-card space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Exercise {idx + 1}</div>
                        <Button variant="outline" size="sm" onClick={() => removeExercise(r.id, item.id)}>
                          Remove
                        </Button>
                      </div>

                      <Separator />

                      <div className="grid gap-2 md:grid-cols-4">
                        <div className="grid gap-1 md:col-span-2">
                          <label className="text-xs text-muted-foreground">Name</label>
                          <Input
                            value={item.exercise.name}
                            onChange={(e) => updateExerciseField(r.id, item.id, "name", e.target.value)}
                            placeholder="e.g., Push-ups"
                          />
                        </div>

                        <div className="grid gap-1">
                          <label className="text-xs text-muted-foreground">Category</label>
                          <Input
                            value={item.exercise.category}
                            onChange={(e) => updateExerciseField(r.id, item.id, "category", e.target.value)}
                            placeholder="upper / lower / core"
                          />
                        </div>

                        <div className="grid gap-1">
                          <label className="text-xs text-muted-foreground">Reps</label>
                          <Input
                            type="number"
                            min={1}
                            max={50}
                            value={item.reps}
                            onChange={(e) => updateExerciseReps(r.id, item.id, Number(e.target.value))}
                          />
                        </div>

                        <div className="grid gap-1 md:col-span-4">
                          <label className="text-xs text-muted-foreground">Video URL</label>
                          <Input
                            value={item.exercise.video}
                            onChange={(e) => updateExerciseField(r.id, item.id, "video", e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button variant="secondary" onClick={() => addExercise(r.id)}>
                      + Add Exercise
                    </Button>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={closeRoutine}>Close</Button>
                  <Button onClick={closeRoutine}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <Button className="fixed right-5 bottom-24 h-12 w-12 rounded-full text-xl shadow-lg z-50" aria-label="Add Routine">
            +
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Routine</DialogTitle>
          </DialogHeader>

          <div className="grid gap-2">
            <label className="text-sm">Routine name</label>
            <Input value={newRoutineName} onChange={(e) => setNewRoutineName(e.target.value)} />
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={onCreateRoutine}>Create & Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

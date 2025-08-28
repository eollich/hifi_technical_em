"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Routine } from "@/lib/types";

export default function RoutineList({ routines }: { routines: Routine[] }) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  return (
    <>
      <div className="grid gap-3">
        {routines.map((r, i) => (
          <Dialog key={r.name} open={openIdx === i} onOpenChange={(o) => setOpenIdx(o ? i : null)}>
            <DialogTrigger asChild>
              <Card
                className="transition-colors hover:bg-muted/50 cursor-pointer"
                onClick={() => setOpenIdx(i)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {r.list.length} {r.list.length === 1 ? "exercise" : "exercises"}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{r.name}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-2">
                {r.list.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No exercises in this routine.</div>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {r.list.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        <span className="font-medium">{item.exercise.name}</span>
                        <span className="text-muted-foreground"> — {item.exercise.category}</span>
                        <span className="text-muted-foreground"> • {item.reps} reps</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenIdx(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FooterNav() {
  const pathname = usePathname();
  const isRoutines = pathname === "/" || pathname?.startsWith("/routines");
  const isWorkouts = pathname?.startsWith("/workouts") || pathname?.startsWith("/session");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-2xl px-4 py-2 grid grid-cols-2 gap-2 border-t">
        <Button asChild variant={isRoutines ? "secondary" : "outline"} aria-pressed={isRoutines} className="w-full">
          <Link href="/">Routines</Link>
        </Button>
        <Button asChild variant={isWorkouts ? "secondary" : "outline"} aria-pressed={isWorkouts} className="w-full">
          <Link href="/workouts">Workouts</Link>
        </Button>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import FooterNav from "@/components/Footer";
import { WorkoutProvider } from "@/lib/workout-store";
import { RoutinesProvider } from "@/lib/routines-store";

export const metadata: Metadata = {
  title: "Daily Fitness",
  description: "Progressive overload tracking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-dvh pb-24">
        <RoutinesProvider>
          <WorkoutProvider>
            {children}
            <FooterNav />
          </WorkoutProvider>
        </RoutinesProvider>
      </body>
    </html>
  );
}

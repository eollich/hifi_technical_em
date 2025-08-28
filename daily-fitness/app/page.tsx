import Header from "@/components/Header";
import RoutineList from "@/components/RoutineList";

export default function Page() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <h3 className="mb-3 text-lg font-semibold">Routines</h3>
        <RoutineList />
      </main>
    </div>
  );
}

import React, { useRef, useState } from "react";
import type { Routine, Workout } from "../types";
import AddWorkoutModal from "../components/AddWorkoutModal";

export default function WorkoutsView({
  workouts, routines, onAdd, onStart, onImport
}: {
  workouts: Workout[];
  routines: Routine[];
  onAdd: (w: Workout) => void;
  onStart: (idx: number) => void;
  onImport: (arr: Workout[]) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(false);


  return (
    <section>
      <h3>Workouts</h3>

      <div style={{display:"flex",gap:8,marginBottom:8}}>
        <button onClick={()=>setOpen(true)} style={{padding:8,border:"1px solid #333",background:"#fff"}}>+ Add Workout</button>
      </div>

      <div>
        {workouts.map((w,idx)=>(
          <div key={idx}
               style={{padding:"8px 12px",borderBottom:"1px solid #eee",cursor:"pointer"}}
               onClick={()=>onStart(idx)}>
            <strong>{w.name}</strong>
            <div style={{fontSize:12,color:"#555"}}>
              {w.routine.name} • weight {w.weight}
            </div>
          </div>
        ))}
        {workouts.length === 0 && <div style={{color:"#666",fontSize:12}}>No workouts yet.</div>}
      </div>

      <AddWorkoutModal
        open={open}
        routines={routines}
        onClose={()=>setOpen(false)}
        onCreate={onAdd}
      />
    </section>
  );
}

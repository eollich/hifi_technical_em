import React, { useEffect, useMemo, useState } from "react";
import type { Workout } from "../types";

export default function SessionView({
  workout, onComplete, onCancel
}: {
  workout: Workout;
  onComplete: (newWeight: number) => void;
  onCancel: () => void;
}): React.ReactElement {
  const routine = workout.routine;
  const [idx, setIdx] = useState(0);
  const current = routine.list[idx];

  const repCount = current?.reps ?? 3;
  const [repChecks, setRepChecks] = useState<boolean[]>(() => Array(repCount).fill(false));

  useEffect(() => {
    const count = routine.list[idx]?.reps ?? 3;
    setRepChecks(Array(count).fill(false));
  }, [idx, routine.list]);

  const allChecked = repChecks.every(Boolean);

  function toggleRep(i: number) {
    setRepChecks(prev => {
      const next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  }

  function handleNext(){
    if(idx < routine.list.length - 1){
      setIdx(idx+1);
      window.scrollTo(0,0);
    }else{
      onComplete(workout.weight + 5);
    }
  }

  const crumbs = useMemo(()=>(
    <div style={{display:"flex",gap:6,flexWrap:"wrap",margin:"8px 0"}}>
      {routine.list.map((_,i)=>(
        <span key={i}
              style={{padding:"4px 8px",border:"1px solid #ddd",borderRadius:999,
                      background: i===idx ? "#d1fadf" : "transparent"}}>
          {i+1}
        </span>
      ))}
    </div>
  ),[idx, routine.list]);

  return (
    <section>
      {crumbs}

      <div style={{border:"1px dashed #aaa",padding:10,margin:"8px 0"}}>
        <div>Exercise:</div>
        <div><strong>{current.exercise.name}</strong></div>
      </div>

      <div style={{border:"1px dashed #aaa",padding:10,margin:"8px 0"}}>
        <div>Video:</div>
        <iframe
          width="100%"
          height="220"
          src={current.exercise.video}
          title={current.exercise.name}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div style={{border:"1px dashed #aaa",padding:10,margin:"8px 0"}}>
        Weight: {workout.weight} → {workout.weight + 5}
      </div>

      <div style={{marginTop:8}}>
        <strong>Reps</strong>
        <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
          {Array.from({ length: repCount }).map((_, i) => (
            <label key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <input
                type="checkbox"
                checked={repChecks[i] || false}
                onChange={()=>toggleRep(i)}
              />
              <span>Rep {i+1}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button onClick={onCancel} style={{padding:8,border:"1px solid #333",background:"#fff"}}>Back</button>
        <button onClick={handleNext} disabled={!allChecked}
                style={{padding:8,border:"1px solid #333",background:"#fff",opacity: allChecked?1:.5}}>
          {idx < routine.list.length - 1 ? "Next Exercise" : "Finish Workout"}
        </button>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import type { Routine, Workout } from "../types";

export default function AddWorkoutModal({
  open, routines, onClose, onCreate
}: {
  open: boolean;
  routines: Routine[];
  onClose: () => void;
  onCreate: (w: Workout) => void;
}): React.ReactElement | null {
  const [name, setName] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(()=>{ if(open){ setName(""); setIdx(0); } }, [open]);
  if(!open) return null;

  const overlay: React.CSSProperties = {
    position:"fixed", inset:0, background:"rgba(0,0,0,.3)",
    display:"flex", alignItems:"center", justifyContent:"center"
  };
  const box: React.CSSProperties = { background:"#fff", border:"1px solid #333", padding:12, width:"90%", maxWidth:420 };

  function handleCreate(){
    if(!name.trim()) return;
    onCreate({ name: name.trim(), routine: routines[idx], weight: 0 });
    onClose();
  }

  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={(e)=>e.stopPropagation()}>
        <h4>New Workout</h4>
        <label>Workout name
          <input value={name} onChange={e=>setName(e.target.value)}
                 style={{display:"block",width:"100%",padding:8,border:"1px solid #ccc",margin:"6px 0"}} />
        </label>
        <label>Routine
          <select value={idx} onChange={e=>setIdx(+e.target.value)}
                  style={{display:"block",width:"100%",padding:8,border:"1px solid #ccc",margin:"6px 0"}}>
            {routines.map((r,i)=><option key={r.name} value={i}>{r.name} ({r.list.length})</option>)}
          </select>
        </label>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onClose} style={{padding:8,border:"1px solid #333",background:"#fff"}}>Cancel</button>
          <button onClick={handleCreate} style={{padding:8,border:"1px solid #333",background:"#fff"}}>Continue</button>
        </div>
      </div>
    </div>
  );
}

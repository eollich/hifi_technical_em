import React from "react";
import type { Routine } from "../types";

export default function RoutinesView({ routines }: { routines: Routine[] }): React.ReactElement {
  return (
    <section>
      <h3>Routines</h3>
      <div>
        {routines.map(r=>(
          <div key={r.name} style={{padding:"8px 12px",borderBottom:"1px solid #eee"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <strong>{r.name}</strong>
              <span>{r.list.length} exercises</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from "react";

type Tab = "routines" | "workouts" | "session";

export default function FooterTabs({
  active,
  onSelect
}: {
  active: Exclude<Tab, "session">;
  onSelect: (tab: Tab) => void;
}): React.ReactElement {
  const bar: React.CSSProperties = {
    position: "fixed", left: 0, right: 0, bottom: 0, display: "flex",
    borderTop: "1px solid #ddd", background: "#fff", padding: 8, gap: 8
  };
  const btn = (k: "routines" | "workouts"): React.CSSProperties => ({
    flex: 1, padding: 8, border: "1px solid #333", background: "#fff",
    fontWeight: 600, opacity: active === k ? 1 : .6, cursor: "pointer"
  });
  return (
    <footer style={bar}>
      <button style={btn("routines")} onClick={()=>onSelect("routines")}>Routines</button>
      <button style={btn("workouts")} onClick={()=>onSelect("workouts")}>Workouts</button>
    </footer>
  );
}

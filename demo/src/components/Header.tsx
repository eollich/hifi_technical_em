import React from "react";
import logo from "../assets/logo.jpg";
import avatar from "../assets/user.jpg";

export default function Header(): React.ReactElement {
  const wrap: React.CSSProperties = {
    padding: "8px 12px", borderBottom: "1px solid #ddd",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  };
  const circle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: "50%", overflow: "hidden",
    display: "flex", justifyContent: "center", alignItems: "center"
  };

  return (
    <header style={wrap}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={circle}>
          <img src={logo} alt="App logo" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        </div>
        <strong>Daily Fitness</strong>
      </div>
      <div style={circle}>
        <img src={avatar} alt="User avatar" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
      </div>
    </header>
  );
}

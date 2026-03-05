"use client";

import Link from "next/link";

export default function Name() {
  return (
    <header 
    style = {{
      backgroundColor: "#f7c14ed9",
      fontSize : 20,

    }}>
      <br />

      <hr
        style={{
          border: 0,
          height: "1px",
          width: "100%",
          margin: 0,
          color: "#b12c2c",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.2rem",
          margin: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src = "https://porcinews.com/wp-content/uploads/2021/09/bioseguridad.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />

          <h1 style={{ margin: 0 , font:"Arial" }}>BIOSEGURIDAD</h1>
        </div>

        <nav className = "underline pr-5 " style={{ display: "flex", gap: "0.5rem" , color : "#0e25d7",justifyContent: "space-between" }}>
          <Link href="/bioseguridad/crear" style={{}}>
            CREAR
          </Link>
          <Link href="/bioseguridad/listarCarpeta">LISTADO</Link>
        </nav>
      </div>
      <hr
        style={{
          border: 0,
          height: "1px",
          width: "100%",
          margin: 0,
          color: "#b12c2c",
        }}
      />
    </header>
  );
}

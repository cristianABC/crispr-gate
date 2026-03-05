"use client";

import Link from "next/link";

export default function Name() {
  return (
    <header>
      <br />

      <hr
        style={{
          border: 0,
          height: "1px",
          width: "100%",
          margin: 0, // elimina separación automática
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.2rem",
          margin: 0, // elimina separación extra
        }}
      >
        <div style = {{display: "flex", alignItems: "center", gap: "0.5rem"}}>

        <img
          src="https://png.pngtree.com/png-vector/20250518/ourmid/pngtree-a-green-crescent-symbol-shines-bright-cultural-pride-glows-in-peace-png-image_16308606.png"
          alt="Logo de la Estación Espacial Alpha"
          style={{ width: "50px", height: "50px" }}
          /> 

        <h1 style={{ margin: 0 }}>
          Estacion Espacial Alpha
        </h1>
          </div>

        <nav style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/tripulantes" style = {{}}>Tripulantes</Link>
          <Link href="/monitoreo">Monitoreo</Link>
        </nav>
      </div>
    </header>
  );
}

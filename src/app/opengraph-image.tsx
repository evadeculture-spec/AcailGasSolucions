import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const lines = Array.from({ length: 9 }, (_, index) => index);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#08172b",
        color: "#ffffff",
        position: "relative",
      }}
    >
      {lines.map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 520,
            right: 0,
            top: 90 + index * 52,
            height: 1,
            background: "linear-gradient(90deg, rgba(79,195,227,0), rgba(127,214,238,0.55))",
          }}
        />
      ))}
      <div
        style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 600 }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            background: "#ffffff",
            color: "#08172b",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
          }}
        >
          A
        </div>
        <div style={{ display: "flex" }}>
          Acail<span style={{ color: "#7fd6ee", marginLeft: 10, fontWeight: 400 }}>Gás</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
        <div style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -2 }}>
          Gases industriais, medicinais e alimentares.
        </div>
        <div style={{ fontSize: 26, color: "#c3cbd5" }}>
          Produção, comercialização e distribuição desde 1996.
        </div>
      </div>
      <div style={{ display: "flex", gap: 40, fontSize: 30, color: "#94a0af" }}>
        {["O₂", "N₂", "Ar", "CO₂", "H₂", "He", "C₂H₂"].map((formula) => (
          <span key={formula}>{formula}</span>
        ))}
      </div>
    </div>,
    size,
  );
}

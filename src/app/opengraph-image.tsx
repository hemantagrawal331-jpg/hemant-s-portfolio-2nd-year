import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Hemant Agrawal | CSE Student | AI/ML | Software Engineering | QA Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1110",
          padding: "72px 80px",
          color: "#e8ebe9",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#8aa39a",
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>Hemant Agrawal</div>
          <div style={{ marginTop: 22, fontSize: 30, color: "#c5d4cf" }}>
            CSE Student · AI/ML · Software Engineering · QA Automation
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#8aa39a" }}>
          University of Delhi · CSE · AI & Machine Learning
        </div>
      </div>
    ),
    { ...size },
  );
}

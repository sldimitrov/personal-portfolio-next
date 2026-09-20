import { ImageResponse } from "next/og";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${AUTHOR.name} - ${AUTHOR.jobTitle}`;

const STACK = ["React", "Vue", "Django", "PostgreSQL", "TypeScript"];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #071a4a 0%, #0b2a6f 55%, #0f3d9a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "12px",
              height: "48px",
              borderRadius: "999px",
              background: "#4fcfd8",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "6px",
              color: "#8fe0e6",
              textTransform: "uppercase",
            }}
          >
            {AUTHOR.jobTitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
            }}
          >
            {AUTHOR.name}
          </div>
          <div style={{ fontSize: "34px", color: "#cfe0fb", lineHeight: 1.4 }}>
            Building production systems with React, Django and PostgreSQL
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            {STACK.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#e7f0fe",
                  fontSize: "24px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ fontSize: "24px", color: "#9ec1f7" }}>
            {SITE_URL.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}

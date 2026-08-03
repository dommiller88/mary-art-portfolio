import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f6f1e7",
          color: "#292420",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 72, fontStyle: "italic", marginTop: 24 }}>
          Artist Portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}

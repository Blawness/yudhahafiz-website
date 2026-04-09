import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          borderRadius: "44px",
          color: "#22d3ee",
          fontSize: "92px",
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-0.05em",
          border: "2px solid #164e63",
        }}
      >
        YH
      </div>
    ),
    {
      ...size,
    }
  );
}

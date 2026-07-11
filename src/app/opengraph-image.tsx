import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Rick and Morty Explorer";
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
          padding: "72px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 45%, #0f172a 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "9999px",
              background: "radial-gradient(circle at 30% 30%, #97ce4c 0%, #4ea12d 55%, #1b4d0e 100%)",
              boxShadow: "0 0 40px rgba(151, 206, 76, 0.45)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#97ce4c",
            }}
          >
            Rick & Morty Explorer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            Characters, Episodes & Locations
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "#d1d5db",
            }}
          >
            Searchable static guides with crawlable detail pages across the multiverse.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#9ca3af",
          }}
        >
          <span>rickmorty-hub.vercel.app</span>
          <span>826 characters · 51 episodes · 126 locations</span>
        </div>
      </div>
    ),
    size
  );
}

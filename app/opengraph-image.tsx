import { readFile } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { ImageResponse } from "next/og";

export const alt = "Pilates Base";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const svgPath = path.join(process.cwd(), "public", "pilates.svg");
  const svg = await readFile(svgPath, "utf-8");
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return new ImageResponse(
    <div
      style={{
        background: "#fef2f2",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={svgDataUrl} alt="Pilates Base" width={320} height={320} />
    </div>,
    {
      ...size,
    },
  );
}

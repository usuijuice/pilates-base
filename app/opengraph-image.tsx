import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Pilates Base";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const notoSansJP = await readFile(
    join(process.cwd(), "assets/NotoSansJP-Regular.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "#fef2f2",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Pilates Base
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: notoSansJP,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

import { NextRequest, NextResponse } from "next/server";
import { generateText, transcribeAudio } from "@/lib/hf";

export const maxDuration = 10;

export async function POST(request: NextRequest) {
  const { blob } = await request.json();

  const res = await transcribeAudio(blob);

  if (!res) {
    return NextResponse.json(
      {
        error: "Failed to transcribe",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(res);
}

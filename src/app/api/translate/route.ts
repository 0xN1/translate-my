import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/hf";

export const maxDuration = 10;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const lang = searchParams.get("lang");

  if (!text || !lang) {
    return NextResponse.json(
      {
        error: "Missing text or language",
      },
      { status: 400 }
    );
  }

  const res = await generateText({ text, lang, time: maxDuration });

  if (!res) {
    return NextResponse.json(
      {
        error: "Failed to translate",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(res);
}

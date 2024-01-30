import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export const maxDuration = 10;

type PredictData = {
  text: string;
  lang: string;
};
const predict = async ({ text, lang }: PredictData) => {
  const inference = new HfInference(process.env.HF_TOKEN);

  const result = await inference.textGeneration({
    model: "mesolitica/translation-t5-small-standard-bahasa-cased-v2",
    inputs: `terjemah ke ${lang}: ${text}`,
    parameters: {
      temperature: 0.7, // high - less accurate
      max_time: 10,
      max_new_tokens: 250,
      top_k: 75, // high - less accurate
      top_p: 0.95, // high - more diverse
      do_sample: true,
    },
  });

  return result;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const lang = searchParams.get("lang");

  if (!text || !lang) {
    return new Response("Missing text or language", { status: 400 });
  }

  const res = await predict({ text, lang });

  if (!res) {
    return new Response("Failed to translate", { status: 500 });
  }

  return NextResponse.json(res);
}

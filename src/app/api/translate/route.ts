import { client } from "@gradio/client";
import { NextRequest, NextResponse } from "next/server";

const url = "https://mesolitica-malaysian-translation.hf.space/";

type PredictData = [text: string, language: string];

const predict = async (data: PredictData) => {
  const app = await client(url, {});
  console.log("DATA =>", data);
  const result = await app.predict("/predict", data);

  console.log("PRED RES =>", result);
  return result;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const lang = searchParams.get("lang");

  console.log("TEXT =>", text);
  console.log("LANG =>", lang);

  if (!text || !lang) {
    return new Response("Missing text or language", { status: 400 });
  }

  const res = await predict([text, lang]);

  if (!res) {
    return new Response("Failed to translate", { status: 500 });
  }

  console.log("RES =>", res);

  return NextResponse.json(res);
}

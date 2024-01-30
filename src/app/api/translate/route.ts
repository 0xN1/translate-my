import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

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
      temperature: 0.8,
      max_time: 60,
      max_new_tokens: 250,
    },
  });

  return result;
};

// const generateImage = async (prompt: string) => {
//   const inference = new HfInference(process.env.HF_TOKEN);

// const prePrompt =
//     "(masterpiece), (best quality), (ultra-detailed), cinematic still {prompt} . emotional, harmonious, vignette, 4k epic detailed, shot on kodak, 35mm photo, sharp focus, high budget, cinemascope, moody, epic, gorgeous, film grain, grainy, ";
//   const image = await inference.textToImage({
//     model: "stabilityai/stable-diffusion-2",
//     inputs: prePrompt + prompt,
//     parameters: {
//       negative_prompt:
//         "blurry,(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (blur, blurry, grainy), morbid, ugly, asymmetrical, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, (airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga, amateur:1.3), (3D ,3D Game, 3D Game Scene, 3D Character:1.1), (bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3),anime, cartoon, graphic, (blur, blurry, bokeh), text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured",
//     },
//   });

//   return image;
// };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const lang = searchParams.get("lang");

  if (!text || !lang) {
    return new Response("Missing text or language", { status: 400 });
  }

  // const image = await generateImage(text);
  // console.log("RES =>", image);
  // return new NextResponse(image, {
  //   headers: {
  //     "content-type": "image/jpeg",
  //   },
  // });

  const res = await predict({ text, lang });

  if (!res) {
    return new Response("Failed to translate", { status: 500 });
  }

  // console.log("RES =>", res);

  return NextResponse.json(res);
}

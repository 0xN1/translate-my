import { HfInference } from "@huggingface/inference";
import { cache } from "react";

type PredictData = {
  text: string;
  lang: string;
  time?: number;
};

export const generateText = async ({ text, lang, time = 60 }: PredictData) => {
  const inference = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

  const result = await inference.textGeneration({
    model: "mesolitica/translation-t5-small-standard-bahasa-cased-v2",
    inputs: `terjemah ke ${lang}: ${text}`,
    parameters: {
      temperature: 0.7, // high - less random
      max_time: time,
      max_new_tokens: 250,
      top_k: 75, // high - less accurate
      top_p: 0.95, // high - more diverse
      do_sample: true,
    },
  });

  return result;
};

export const transcribeAudio = async (audio: Blob, token?: string) => {
  const inference = new HfInference(process.env.HF_TOKEN);
  console.log(token);

  const audioBlob = audio;

  const result = await inference.automaticSpeechRecognition({
    model: "mesolitica/malaysian-whisper-tiny",
    data: await audioBlob.arrayBuffer(),
  });

  if (!result) {
    throw new Error("Failed to transcribe");
  }

  return result;
};

export const transcribe = cache(async (audio: Blob, token: string) => {
  if (!audio) {
    throw new Error("Missing audio");
  }

  const result = await transcribeAudio(audio, token);

  if (!result) {
    throw new Error("Failed to transcribe");
  }

  return result;
});

export const translateText = cache(async (text: string, lang: string) => {
  if (!text || !lang) {
    throw new Error("Missing text or language");
  }

  const result = await generateText({ text, lang });

  if (!result) {
    throw new Error("Failed to translate");
  }

  return result;
});

import { cache } from "react";

type PredictData = {
  text: string;
  lang: string;
  time?: number;
};

export const generateText = async ({ text, lang }: PredictData) => {
  const response = await fetch(
    "https://api.mesolitica.com/translation/public",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: `${text}`,
        to_lang: lang,
        top_k: 1,
        top_p: 1,
        repetition_penalty: 1.1,
        temperature: 0,
      }),
    },
  );

  const output = await response.json();

  if (!output || !output.result) {
    throw new Error("Failed to generate text");
  }

  return {
    text: output.result,
    lang: lang,
  };
};

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

"use server";

import { revalidatePath } from "next/cache";

export const translate = async (text: string, lang: string) => {
  const api = "http://localhost:1331/api/translate";
  const url = `${api}?text=${encodeURIComponent(
    text
  )}&lang=${encodeURIComponent(lang)}`;

  console.log("URL =>", url);

  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      return null;
    }

    const data = await res.json();

    if (data.error) {
      return null;
    }

    revalidatePath("/");
    return data;
  } catch (error) {
    return null;
  }
};

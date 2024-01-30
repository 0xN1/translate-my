"use client";

import Header from "@/components/header";
import { SITE_URL } from "@/lib/constants";
import { ArrowDownUp, Clipboard, Eraser, Languages } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export default function Home() {
  const languages = [
    {
      label: "English",
      value: "Inggeris",
    },
    {
      label: "Malay",
      value: "Malay",
    },
    {
      label: "Bahasa Pasar [WIP]",
      value: "pasar Melayu",
    },
    {
      label: "Manglish [WIP]",
      value: "Manglish",
    },
  ];

  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("type here");
  const [selectedLang, setSelectedLang] = useState("English");
  const [loading, setLoading] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();

  const translate = useCallback(async () => {
    const text = inputText;
    const lang = languages.find(({ label }) => label === selectedLang)!.value;

    const api = `${SITE_URL}/api/translate`;
    const url = `${api}?text=${encodeURIComponent(
      text
    )}&lang=${encodeURIComponent(lang)}`;

    setLoading(true);

    const res = await fetch(url);

    const data = await res.json();

    if (data.generated_text) {
      setLoading(false);
      setTranslatedText(data.generated_text);
    }
  }, [inputText, selectedLang]);

  useEffect(() => {
    if (loading) {
      setTranslatedText("translating...");
    }
  }, [loading]);

  const reverse = () => {
    const temp = inputText;
    const tempLang = selectedLang;

    setSelectedLang(tempLang === "English" ? "Malay" : "English");
    setInputText(translatedText);
    setTranslatedText(temp);
  };

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-6 sm:p-10 font-sans z-10">
      <Header />

      <div className="grid grid-rows-2 w-full px-4 sm:px-8 lg:px-16 gap-8 items-center h-full min-h-[60vh] max-h-[60vh]">
        <div className="flex flex-col self-start gap-4">
          <span>Input</span>
          <textarea
            name="text"
            rows={4}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ingat saya tak tau ke?"
            className="focus:ring-none bg-transparent focus:outline-none text-2xl sm:text-3xl lg:text-4xl max-w-prose w-full  text-orange-500
            scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-zinc-100 resize-none
            "
          />
        </div>

        <div className="flex flex-col self-start gap-4">
          <span>Output</span>
          <span className="text-2xl sm:text-3xl lg:text-4xl max-w-prose w-full  max-h-[10rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-100">
            {translatedText}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-around h-full w-full items-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-4xl w-full items-center justify-between">
          <div className="flex flex-row gap-2 w-full justify-around sm:justify-between px-4">
            <select
              onChange={(e) => setSelectedLang(e.target.value)}
              name="lang"
              value={selectedLang}
              className="focus:ring-none focus:outline-none text-sm sm:text-lg max-w-max sm:max-w-xs
              bg-white bg-opacity-5 border border-transparent hover:border rounded-md 
              text-zinc-800 caret-orange-500 
              "
            >
              {languages.map(({ label, value }) => (
                <option key={value}>{label}</option>
              ))}
            </select>
            <button
              onClick={(e) => {
                e.preventDefault();
                translate();
              }}
              className="text-white sm:hidden px-4 py-2 bg-orange-500 hover:text-white p-2 text-sm sm:text-lg hover:bg-orange-600 focus:ring-none focus:outline-none flex flex-row gap-2 items-center rounded-md"
            >
              Translate <Languages className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="w-full flex flex-row gap-2 sm:gap-8 justify-center sm:justify-end items-center">
            {inputText && (
              <button
                onClick={() => {
                  setInputText("");
                  setTranslatedText("");
                }}
                className="text-zinc-800 px-4 py-2 hover:text-orange-600 text-sm sm:text-lg flex flex-row gap-2 items-center rounded-md"
              >
                Clear
                <Eraser className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            )}
            {translatedText && !loading && (
              <>
                <button
                  onClick={reverse}
                  className="text-zinc-800 px-4 py-2 hover:text-orange-600 text-sm sm:text-lg flex flex-row gap-2 items-center rounded-md"
                >
                  Switch
                  <ArrowDownUp className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => {
                    copy(translatedText).then((success) => {
                      if (success) {
                        alert("copied");
                      } else {
                        alert("failed");
                      }
                    });
                  }}
                  className="text-zinc-800 px-4 py-2 hover:text-orange-600 text-sm sm:text-lg flex flex-row gap-2 items-center rounded-md"
                >
                  Copy <Clipboard className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                translate();
              }}
              className="text-white hidden px-4 py-2 bg-orange-500 hover:text-white p-2 text-sm sm:text-lg hover:bg-orange-600 focus:ring-none focus:outline-none sm:flex sm:flex-row gap-2 items-center rounded-md"
            >
              Translate <Languages className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import Header from "@/components/header";
import LanguageSelector from "@/components/home/lang-selector";
import ToolButton from "@/components/home/tool-button";
import TranslateButton from "@/components/home/translate-button";
import TranslationFields from "@/components/home/translation-fields";
import { translateText } from "@/lib/hf";
import {
  ArrowDownUp,
  Clipboard,
  Eraser,
  Columns2,
  Rows2,
  BracketsIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { cn } from "@/lib/utils";

const supportedLang = [
  { label: "English", value: "en", experimental: false },
  { label: "Malay", value: "ms", experimental: false },
  { label: "Johor", value: "johor", experimental: true },
  { label: "Melaka", value: "melaka", experimental: true },
  { label: "Manglish", value: "manglish", experimental: true },
  { label: "Local Malay", value: "local-ms", experimental: true },
  { label: "Mandarin", value: "mandarin", experimental: true },
  { label: "Sabah", value: "sabah", experimental: true },
  { label: "Local Mandarin", value: "local-mandarin", experimental: true },
  { label: "Pahang", value: "pahang", experimental: true },
  { label: "Cantonese", value: "cantonese", experimental: true },
  { label: "Terengganu", value: "terengganu", experimental: true },
  { label: "Perak", value: "perak", experimental: true },
  { label: "Sarawak", value: "sarawak", experimental: true },
  { label: "Jawi", value: "jawi", experimental: true },
  { label: "Banjar", value: "banjar", experimental: true },
  { label: "Kedah", value: "kedah", experimental: true },
  { label: "Jawa", value: "jawa", experimental: true },
  { label: "Tamil", value: "tamil", experimental: true },
  { label: "Negeri Sembilan", value: "negeri sembilan", experimental: true },
];

const languages = supportedLang.map((lang) => ({
  label: lang.label,
  value: lang.value,
  experimental: lang.experimental,
}));

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedLang, setSelectedLang] = useState(supportedLang[0]);
  const [loading, setLoading] = useState(false);
  const [horizontal, setHorizontal] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const [_, copy] = useCopyToClipboard();

  const translate = useCallback(async () => {
    const text = inputText;
    const lang = languages.find(
      ({ label }) => label === selectedLang.label,
    )!.value;
    setLoading(true);

    try {
      const data = await translateText(text, lang);

      if (data.text) {
        setLoading(false);
        setTranslatedText(data.text);
        setTotalTokens(data.usage?.total_tokens || 0);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setTranslatedText("error translating. please try again later.");
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

    const currentIndex = supportedLang.findIndex((lang) => lang === tempLang);
    const nextLang =
      currentIndex === supportedLang.length - 1
        ? supportedLang[0]
        : supportedLang[currentIndex + 1];

    setSelectedLang(nextLang);
    setInputText(translatedText);
    setTranslatedText(temp);
  };

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-6 sm:p-10 font-sans z-10">
      <Header />

      <TranslationFields
        {...{ inputText, setInputText, translatedText, translate, horizontal }}
      />

      <div className="flex flex-col justify-around h-full w-full items-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-4xl w-full items-center justify-between">
          <div className="flex flex-row gap-2 w-full justify-around sm:justify-between px-4">
            <LanguageSelector
              selectedLang={selectedLang.value} // Pass the value of the selected language
              setSelectedLang={(value) => {
                const lang = supportedLang.find((lang) => lang.value === value);
                if (lang) setSelectedLang(lang); // Update the selected language object
              }}
              languages={languages}
            />

            <TranslateButton translate={translate} mobile />
          </div>
          <div className="w-full flex flex-row gap-2 sm:gap-8 justify-center sm:justify-end items-center">
            <ToolButton
              label="Clear"
              icon={Eraser}
              onClick={() => {
                setInputText("");
                setTranslatedText("");
              }}
            />

            {translatedText && !loading && (
              <>
                <ToolButton
                  label="Switch"
                  icon={ArrowDownUp}
                  onClick={reverse}
                />
                <ToolButton
                  label="Copy"
                  icon={Clipboard}
                  onClick={() => {
                    copy(translatedText).then((success) => {
                      if (success) {
                        alert("copied");
                      } else {
                        alert("failed");
                      }
                    });
                  }}
                />
                {totalTokens > 0 && (
                  <div className="text-sm sm:text-sm inline-flex justify-center items-center">
                    {totalTokens}
                    <BracketsIcon className="w-4 h-4 sm:w-6 sm:h-6 ml-1" />
                  </div>
                )}
              </>
            )}

            <SwitchLayout {...{ horizontal, setHorizontal }} mobile={false} />
            <TranslateButton translate={translate} />
          </div>
        </div>
      </div>
    </main>
  );
}

const SwitchLayout = ({
  horizontal,
  setHorizontal,
  mobile,
}: {
  horizontal: boolean;
  setHorizontal: (val: boolean) => void;
  mobile?: boolean;
}) => {
  return (
    <>
      <button
        onClick={() => setHorizontal(!horizontal)}
        className={cn(
          "text-white hidden bg-orange-500 hover:text-white p-2 text-sm sm:text-lg hover:bg-orange-600 focus:ring-none focus:outline-none sm:flex sm:flex-row items-center rounded-md min-w-max ",
        )}
      >
        {horizontal ? (
          <Columns2 className="w-6 h-6" />
        ) : (
          <Rows2 className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

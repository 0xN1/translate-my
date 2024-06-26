"use client";

import Header from "@/components/header";
import LanguageSelector from "@/components/home/lang-selector";
import ToolButton from "@/components/home/tool-button";
import TranslateButton from "@/components/home/translate-button";
import TranslationFields from "@/components/home/translation-fields";
import { translateText } from "@/lib/hf";
import { ArrowDownUp, Clipboard, Eraser, Columns2, Rows2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { cn } from "@/lib/utils";

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

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");
  const [loading, setLoading] = useState(false);
  const [horizontal, setHorizontal] = useState(false);
  const [_, copy] = useCopyToClipboard();

  const translate = useCallback(async () => {
    const text = inputText;
    const lang = languages.find(({ label }) => label === selectedLang)!.value;
    setLoading(true);

    try {
      const data = await translateText(text, lang);

      if (data.generated_text) {
        setLoading(false);
        setTranslatedText(data.generated_text);
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

    setSelectedLang(tempLang === "English" ? "Malay" : "English");
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
              {...{ selectedLang, setSelectedLang, languages }}
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
          "text-white hidden bg-orange-500 hover:text-white p-2 text-sm sm:text-lg hover:bg-orange-600 focus:ring-none focus:outline-none sm:flex sm:flex-row items-center rounded-md min-w-max "
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

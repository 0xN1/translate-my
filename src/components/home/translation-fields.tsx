import React from "react";
import { cn } from "@/lib/utils";

const TranslationFields = ({
  inputText,
  setInputText,
  translatedText,
  translate,
  horizontal,
}: {
  inputText: string;
  setInputText: (text: string) => void;
  translatedText: string;
  translate: () => void;
  horizontal: boolean;
}) => {
  return (
    <div
      className={cn(
        "grid grid-rows-2 w-full px-4 sm:px-8 lg:px-16 gap-8 items-center h-full min-h-[60vh] max-h-[60vh]",
        horizontal
          ? "sm:grid-cols-2 sm:grid-rows-1 sm:min-h-[60vh] sm:max-h-full sm:min-w-[50%]"
          : "grid-cols-1 grid-row-2 min-h-[60vh] max-h-full min-w-full"
      )}
    >
      <div className="flex flex-col self-start gap-4">
        <span>Input</span>
        <textarea
          name="text"
          rows={horizontal ? 8 : 4}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              translate();
            }
          }}
          placeholder="type your text here"
          className="focus:ring-none bg-transparent focus:outline-none text-2xl sm:text-3xl lg:text-4xl max-w-prose w-full h-full text-orange-500
              scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-zinc-100 resize-none"
        />
      </div>

      <div className="flex flex-col self-start gap-4">
        <span>Output</span>
        <span
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl max-w-prose w-full max-h-[20rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-100",
            horizontal ? "sm:max-h-[20rem]" : "max-h-[10rem]"
          )}
        >
          {translatedText}
        </span>
      </div>
    </div>
  );
};

export default TranslationFields;

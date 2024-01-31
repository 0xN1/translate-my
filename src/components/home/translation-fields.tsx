import React from "react";

const TranslationFields = ({
  inputText,
  setInputText,
  translatedText,
}: {
  inputText: string;
  setInputText: (text: string) => void;
  translatedText: string;
}) => {
  return (
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
          placeholder="type your text here"
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
  );
};

export default TranslationFields;

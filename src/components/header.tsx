import { BookOpen, Github, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex flex-row justify-between items-center w-full text-lg">
      <div className="text-xl flex items-center justify-around gap-2">
        <Link href="/">
          <div className="flex flex-row gap-2 items-center justify-center">
            <img src="/logo.svg" className="w-8 h-8 inline-block" alt="logo" />
            <span className="">translateMY</span>{" "}
          </div>
        </Link>
        <span className="text-xs hidden sm:inline-flex mt-1">
          model by{" "}
          <Link
            href="https://huggingface.co/mesolitica/translation-t5-tiny-standard-bahasa-cased"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hover:text-orange-600"
          >
            mesolitica
          </Link>
        </span>
      </div>
      <div className="flex flex-row items-center justify-around gap-8">
        <Link
          href="https://github.com/0xn1/translate-my"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-600"
        >
          <Github className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <Link href="/about" className="hover:text-orange-600">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        {/* <Link href="/settings" className="hover:text-orange-600">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link> */}
      </div>
    </header>
  );
};

export default Header;

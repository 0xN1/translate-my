import Header from "@/components/header";
import Link from "next/link";
import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-6 sm:p-10 font-sans z-10">
      <Header />
      <div className="grid grid-rows-1 w-full max-h-[50vh] h-[50vh] gap-4 px-8 sm:px-24">
        <h1 className="-ml-1 text-4xl sm:text-6xl self-center">about</h1>
        <div className="text-sm sm:text-2xl">
          <p>
            site built by{" "}
            <Link
              href="https://x.com/0xNeroOne"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 underline"
            >
              0xN1
            </Link>
          </p>
          <p>
            translation model by{" "}
            <Link
              href="https://mesolitica.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 underline"
            >
              mesolitica
            </Link>{" "}
            (
            <Link
              href="https://github.com/mesolitica/malaya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 underline"
            >
              malaya
            </Link>
            )
          </p>
          <p>made in malaysia</p>
        </div>
        <div className="text-sm sm:text-2xl break-all flex flex-col">
          <p>ref:</p>
          <Link
            href="https://huggingface.co/spaces/mesolitica/malaysian-translation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600 underline"
          >
            malaysian-translation spaces
          </Link>
          <Link
            href="https://huggingface.co/mesolitica/translation-t5-tiny-standard-bahasa-cased"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600 underline"
          >
            translation-t5-tiny-standard-bahasa-cased
          </Link>
          <p></p>
        </div>
      </div>
      <div></div>
    </main>
  );
};

export default AboutPage;

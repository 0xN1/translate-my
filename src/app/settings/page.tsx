"use client";

import Header from "@/components/header";
import Link from "next/link";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type Props = {};

const SettingsPage = (props: Props) => {
  const [hfToken, setHfToken] = useLocalStorage("hf_token", "");

  // useEffect(() => {
  //   console.log(hfToken);
  // }, [hfToken]);
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-6 sm:p-10 font-sans z-10">
      <Header />
      <div className="grid grid-rows-1 w-full max-h-[50vh] h-[50vh] gap-4 px-8 sm:px-24">
        <h1 className="-ml-1 text-4xl sm:text-6xl self-center">settings</h1>
        <div className="flex flex-col items-start justify-center w-full gap-2">
          <label htmlFor="hf_token" className="sm:text-2xl text-xl mb-2">
            access token
            <span className="text-xs sm:ml-4 ml-2">
              get yours at{" "}
              <Link
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 inline-block"
              >
                huggingface
              </Link>
            </span>
          </label>
          <input
            type="text"
            id="hf_token"
            value={hfToken}
            onChange={(e) => setHfToken(e.target.value)}
            className="w-full max-prose max-w-md p-4 mb-4 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div></div>
    </main>
  );
};

export default SettingsPage;

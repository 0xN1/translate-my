"use client";

import Header from "@/components/header";
import { transcribe } from "@/lib/hf";
import { MicIcon, MicOffIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

type Props = {};

const SttPage = (props: Props) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const [transcription, setTranscription] = useState<string>("");
  const [transcribing, setTranscribing] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  //   const [hfToken, setHfToken] = useLocalStorage("hf_token", "");

  const token = useReadLocalStorage("hf_token", {
    deserializer: (value) => value,
  });

  console.log(token);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    setAudioBlob(null);
    mediaRecorder.current.start();
    setRecording(true);

    const audioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    setAudioChunks(audioChunks);
  };

  const stopRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    setAudioBlob(audioBlob);

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };
    }
    setRecording(false);
  };

  const transcribeAudio = useCallback(async () => {
    setTranscribing(true);

    try {
      const data = await transcribe(audioBlob!, token!);

      if (data.text) {
        setTranscription(data.text);
        setTranscribing(false);
      }
    } catch (err) {
      console.log(err);
      setTranscribing(false);
      setTranscription("error transcribing. please try again later.");
    }
  }, [audioBlob]);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-6 sm:p-10 font-sans z-10">
      <Header />
      <div className="flex flex-col justify-around items-start w-full min-h-[50vh] px-8 sm:px-24">
        <h1 className="-ml-1 text-6xl">STT</h1>
        <div className="flex flex-row gap-2">
          {recording ? (
            <button className="px-4 py-2" onClick={stopRecording}>
              <MicOffIcon className="w-6 h-6" />
            </button>
          ) : (
            <button className="px-4 py-2" onClick={startRecording}>
              <MicIcon className="w-6 h-6" />
            </button>
          )}
          {audioBlob && (
            <>
              <audio
                controls
                src={audioBlob ? URL.createObjectURL(audioBlob) : ""}
              ></audio>
              <button
                className="px-6 py-2 text-orange-500 "
                onClick={transcribeAudio}
              >
                Transcribe
              </button>
            </>
          )}
        </div>
        {!transcribing ? (
          <div className="w-full max-prose text-3xl p-4 rounded-md">
            <p>{transcription}</p>
          </div>
        ) : (
          <div className="w-full max-prose text-3xl p-4 rounded-md">
            <p>Transcribing...</p>
          </div>
        )}
      </div>

      <div></div>
    </main>
  );
};

export default SttPage;

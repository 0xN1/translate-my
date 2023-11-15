import { useEffect } from "react";

export default function Home() {
  const test = () => {
    const text = "Saya suka makan nasi lemak";
    const lang = "English";
    const api = "http://localhost:3000/api/translate";
    // const url = `${api}?text=${text}&lang=${lang}}`

    // url encoded
    const url = `${api}?text=${encodeURIComponent(
      text
    )}&lang=${encodeURIComponent(lang)}`;

    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  console.log(test());

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-24 font-sans">
      <header className="font-mono text-lg">translate-my</header>
      <div className="text-4xl font">Translate</div>
      <footer className="text-xs font-light font-mono">
        Client by N1 / API by Malaya (Thanks mesolitica)
      </footer>
    </main>
  );
}

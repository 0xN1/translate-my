export default function Home() {
  const languages = ["Inggeris", "Malay", "pasar", "Manglish"];

  const test = () => {
    const text = "Saya suka makan nasi lemak";
    const lang = "English";
    const api = "http://localhost:1331/api/translate";

    // url encoded
    const url = `${api}?text=${encodeURIComponent(
      text
    )}&lang=${encodeURIComponent(lang)}`;

    // console.log("URL => ", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log("DATA => ", data))
      .catch((err) => console.log("ERROR => ", err));
  };

  test();

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-24 font-sans">
      <header className="font-mono text-lg">translate-my</header>
      <div className="flex flex-col gap-2 items-center text-4xl font">
        <span>Translate</span>
        {/* <span>{JSON.stringify(dataResult)}</span> */}
      </div>
      <footer className="text-xs font-light font-mono">
        Client by N1 / API by Malaya (Thanks mesolitica)
      </footer>
    </main>
  );
}

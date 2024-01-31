const LanguageSelector = ({
  selectedLang,
  setSelectedLang,
  languages,
}: {
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  languages: { label: string; value: string }[];
}) => {
  return (
    <select
      onChange={(e) => setSelectedLang(e.target.value)}
      name="lang"
      value={selectedLang}
      className="focus:ring-none focus:outline-none text-sm sm:text-lg max-w-max sm:max-w-xs
                bg-white bg-opacity-5 border border-transparent hover:border rounded-md 
                text-zinc-800 caret-orange-500 
                "
    >
      {languages.map(({ label, value }) => (
        <option key={value}>{label}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;

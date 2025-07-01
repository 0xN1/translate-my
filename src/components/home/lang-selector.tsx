const LanguageSelector = ({
  selectedLang,
  setSelectedLang,
  languages,
}: {
  selectedLang: string; // Expect the value (e.g., "en", "ms")
  setSelectedLang: (value: string) => void; // Update the value
  languages: { label: string; value: string; experimental?: boolean }[];
}) => {
  return (
    <select
      onChange={(e) => setSelectedLang(e.target.value)} // Pass the value to the parent
      name="lang"
      value={selectedLang} // Bind the value
      className="focus:ring-none focus:outline-none text-sm sm:text-lg max-w-max sm:max-w-xs
                bg-white bg-opacity-5 border border-transparent hover:border rounded-md
                text-zinc-800 caret-orange-500
                "
    >
      {languages.map(({ label, value, experimental }) => (
        <option key={value} value={value}>
          {" "}
          {/* Ensure the value is set */}
          {label}
          {experimental ? " *" : ""}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;

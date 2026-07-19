const MODES = [
  { id: "index", label: "Index" },
  { id: "ce", label: "CE" },
  { id: "pe", label: "PE" },
];

export default function InputModeToggle({ mode, onChange }) {
  return (
    <div className="flex mb-6 bg-gray-800 rounded-lg p-1 w-fit">
      {MODES.map((m) => (
        <button
          key={m.id}
          className={`px-5 py-2.5 rounded-md font-semibold text-base cursor-pointer ${
            mode === m.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => onChange(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

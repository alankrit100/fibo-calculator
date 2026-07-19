export default function InputModeToggle({ mode, onChange }) {
  return (
    <div className="flex mb-6 bg-gray-800 rounded-lg p-1 w-fit">
      <button
        className={`px-5 py-2.5 rounded-md font-semibold text-base cursor-pointer ${
          mode === "manual" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
        }`}
        onClick={() => onChange("manual")}
      >
        Manual Entry
      </button>
      <button
        className={`px-5 py-2.5 rounded-md font-semibold text-base cursor-pointer ${
          mode === "options" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
        }`}
        onClick={() => onChange("options")}
      >
        Options
      </button>
    </div>
  );
}

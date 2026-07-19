import { useState } from "react";
import { generateCSV } from "../utils/formatters";

export default function ExportControls({ levels }) {
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");
  const [exportError, setExportError] = useState("");

  const handleExport = () => {
    setExportError("");
    const lb = parseFloat(lower);
    const ub = parseFloat(upper);
    if (isNaN(lb) || isNaN(ub)) {
      setExportError("Enter valid upper and lower bounds.");
      return;
    }
    if (!levels || levels.length === 0) {
      setExportError("No data to export.");
      return;
    }

    const csv = generateCSV(levels, lb, ub);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fibonacci_levels.csv";
    link.click();
  };

  return (
    <div className="flex gap-2 items-center pt-4 flex-wrap">
      <label className="text-base font-medium text-gray-200">Lower Bound</label>
      <input
        type="number"
        step="0.01"
        value={lower}
        onChange={(e) => setLower(e.target.value)}
        className="input-box w-28"
      />
      <label className="text-base font-medium text-gray-200">Upper Bound</label>
      <input
        type="number"
        step="0.01"
        value={upper}
        onChange={(e) => setUpper(e.target.value)}
        className="input-box w-28"
      />
      <button
        onClick={handleExport}
        className="bg-blue-500 hover:bg-blue-600 px-5 py-3 text-base rounded-md font-semibold cursor-pointer"
      >
        Export CSV
      </button>
      {exportError && (
        <p className="w-full text-red-400 text-base">{exportError}</p>
      )}
    </div>
  );
}

import { useState } from "react";
import { generateCSV } from "../utils/formatters";

export default function ExportControls({ levels }) {
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");

  const handleExport = () => {
    const lb = parseFloat(lower);
    const ub = parseFloat(upper);
    if (isNaN(lb) || isNaN(ub)) {
      alert("Enter valid upper and lower bounds.");
      return;
    }
    if (!levels || levels.length === 0) {
      alert("No data to export.");
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
      <label className="text-sm">Lower Bound</label>
      <input
        type="number"
        step="0.01"
        value={lower}
        onChange={(e) => setLower(e.target.value)}
        className="input-box w-24"
      />
      <label className="text-sm">Upper Bound</label>
      <input
        type="number"
        step="0.01"
        value={upper}
        onChange={(e) => setUpper(e.target.value)}
        className="input-box w-24"
      />
      <button
        onClick={handleExport}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold cursor-pointer"
      >
        Export CSV
      </button>
    </div>
  );
}

import { useState, useEffect } from "react";

const FIELDS = ["open", "high", "low", "close"];

export default function OptionsForm({ onCalculate }) {
  const [values, setValues] = useState(() => {
    const saved = {};
    FIELDS.forEach((key) => {
      saved[key] = localStorage.getItem(key) || "";
    });
    saved.manualPivot = "";
    return saved;
  });

  useEffect(() => {
    FIELDS.forEach((key) => {
      if (values[key]) localStorage.setItem(key, values[key]);
    });
  }, [values]);

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleCalculate = () => {
    const parsed = {};
    FIELDS.forEach((key) => {
      parsed[key] = parseFloat(values[key]);
    });
    parsed.manualPivot = parseFloat(values.manualPivot);
    onCalculate(parsed);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-blue-400">Options Fibonacci Calculator</h2>
      {FIELDS.map((key) => (
        <div key={key}>
          <label className="block mb-1 text-base font-semibold capitalize">{key}</label>
          <input
            type="number"
            value={values[key]}
            onChange={handleChange(key)}
            className="input-box"
          />
        </div>
      ))}
      <div className="pt-4 border-t border-gray-700">
        <label className="block mb-1 text-base font-semibold text-yellow-400">
          OR Enter Pivot Directly
        </label>
        <input
          type="number"
          value={values.manualPivot}
          onChange={handleChange("manualPivot")}
          className="input-box"
          placeholder="Optional: Enter Pivot Value"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg rounded-md font-semibold cursor-pointer"
      >
        Calculate Fibonacci Levels
      </button>
    </div>
  );
}

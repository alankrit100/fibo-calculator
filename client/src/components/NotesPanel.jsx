import { useState, useEffect } from "react";

const NOTES_KEYS = ["buyAt", "target", "stoploss", "totalLines"];
const LABELS = ["Buy at:", "Target:", "Stoploss:", "Total Lines:"];

function lsKey(mode, key) { return mode + "_" + key; }

export default function NotesPanel({ mode }) {
  const [values, setValues] = useState(() => {
    const saved = {};
    NOTES_KEYS.forEach((key) => {
      saved[key] = localStorage.getItem(lsKey(mode, key)) || "";
    });
    saved.remarks = localStorage.getItem(lsKey(mode, "remarks")) || "";
    return saved;
  });

  useEffect(() => {
    NOTES_KEYS.forEach((key) => {
      localStorage.setItem(lsKey(mode, key), values[key]);
    });
    localStorage.setItem(lsKey(mode, "remarks"), values.remarks);
  }, [values, mode]);

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="mt-6 p-4 bg-gray-850 border border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Notes</h3>
      <div className="grid grid-cols-2 gap-3">
        {NOTES_KEYS.map((key, i) => (
          <div key={key}>
            <label className="block mb-1 text-base font-medium text-gray-200">
              {LABELS[i]}
            </label>
            <input
              type="number"
              value={values[key]}
              onChange={handleChange(key)}
              className="input-box text-lg py-3"
              placeholder="—"
            />
          </div>
        ))}
      </div>
      <div className="mt-3">
        <label className="block mb-1 text-base font-medium text-gray-200">
          Anything else?
        </label>
        <textarea
          value={values.remarks}
          onChange={handleChange("remarks")}
          className="input-box text-base py-3 resize-y min-h-[60px]"
          placeholder="Optional notes..."
          rows={2}
        />
      </div>
    </div>
  );
}

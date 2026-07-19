import { useState } from "react";
import { formatPrice } from "../utils/formatters";

export default function ResultsTable({ levels, closestToHighIdx, closestToLowIdx }) {
  const [selected, setSelected] = useState(null);

  function selectCell(row, col) {
    if (selected && selected.row === row && selected.col === col) {
      setSelected(null);
    } else {
      setSelected({ row, col });
    }
  }

  if (!levels || levels.length === 0) {
    return (
      <table className="w-full text-left text-base select-none">
        <thead className="border-b border-gray-600 text-white">
          <tr>
            <th className="px-3 py-2">S.No</th>
            <th className="px-3 py-2">Δ</th>
            <th className="px-3 py-2">+Δ</th>
            <th className="px-3 py-2">−Δ</th>
            <th className="px-3 py-2">S.No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="text-center py-4 text-gray-400">
              Results will appear here after calculation.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function cellClasses(base, row, col) {
    const isSelected = selected && selected.row === row && selected.col === col;
    return (base || "") + (isSelected ? " outline outline-2 outline-blue-400" : "");
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <table className="w-full text-left text-base select-none">
        <thead className="border-b border-gray-600 text-white sticky top-0 bg-gray-800">
          <tr>
            <th className="px-3 py-2">S.No</th>
            <th className="px-3 py-2">Δ</th>
            <th className="px-3 py-2">+Δ</th>
            <th className="px-3 py-2">−Δ</th>
            <th className="px-3 py-2">S.No</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            let sno = 0;
            return levels.map((lv, i) => {
              const isHigh = i === closestToHighIdx;
              const isLow = i === closestToLowIdx;
              const plusClass = isHigh
                ? "text-green-100 font-bold"
                : "text-green-400";
              const minusClass = isLow
                ? "text-red-100 font-bold"
                : "text-red-400";
              const frac = Math.round((lv.delta % 1) * 100);
              const showSno = [0, 21, 34, 55, 89].includes(frac);
              if (showSno) sno++;
              return (
                <tr key={i} className="hover:bg-gray-700">
                  <td
                    className={cellClasses("px-3 py-2 text-gray-400", i, "sno")}
                    onClick={() => selectCell(i, "sno")}
                  >
                    {showSno ? sno : ""}
                  </td>
                  <td
                    className={cellClasses("px-3 py-2 font-medium", i, "delta")}
                    onClick={() => selectCell(i, "delta")}
                  >
                    {lv.delta}
                  </td>
                  <td
                    className={cellClasses("px-3 py-2 " + plusClass, i, "plus")}
                    onClick={() => selectCell(i, "plus")}
                  >
                    {formatPrice(lv.plus)}
                  </td>
                  <td
                    className={cellClasses("px-3 py-2 " + minusClass, i, "minus")}
                    onClick={() => selectCell(i, "minus")}
                  >
                    {formatPrice(lv.minus)}
                  </td>
                  <td
                    className={cellClasses("px-3 py-2 text-gray-400", i, "sno-r")}
                    onClick={() => selectCell(i, "sno-r")}
                  >
                    {showSno ? sno : ""}
                  </td>
                </tr>
              );
            });
          })()}
        </tbody>
      </table>
    </div>
  );
}

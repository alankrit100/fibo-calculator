import { useState } from "react";
import { formatPrice } from "../utils/formatters";
import ColorPicker from "./ColorPicker";

export default function ResultsTable({ levels, closestToHighIdx, closestToLowIdx, customColors, onColorChange }) {
  const [pickingFor, setPickingFor] = useState(null);

  const isPicking = pickingFor !== null;

  if (!levels || levels.length === 0) {
    return (
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-600 text-white">
          <tr>
            <th className="px-2 py-1">S.No</th>
            <th className="px-2 py-1">Δ</th>
            <th className="px-2 py-1">+Δ</th>
            <th className="px-2 py-1">−Δ</th>
            <th className="px-2 py-1">S.No</th>
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

  function handleColorSelect(hex) {
    if (!pickingFor) return;
    onColorChange(pickingFor.index, pickingFor.side, hex);
    setPickingFor(null);
  }

  function cellKey(i, side) { return `${i}-${side}`; }

  function getCellStyle(i, side) {
    const c = customColors[cellKey(i, side)];
    if (c) return { color: c };
    return {};
  }

  function getTextClass(i, side) {
    const base = side === "plus" ? "text-green-400" : "text-red-400";
    if (customColors[cellKey(i, side)]) return "font-bold";
    if (i === closestToHighIdx && side === "plus") return "text-green-300 font-bold";
    if (i === closestToLowIdx && side === "minus") return "text-red-300 font-bold";
    return base;
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-600 text-white sticky top-0 bg-gray-800">
          <tr>
            <th className="px-2 py-1">S.No</th>
            <th className="px-2 py-1">Δ</th>
            <th className="px-2 py-1">+Δ</th>
            <th className="px-2 py-1">−Δ</th>
            <th className="px-2 py-1">S.No</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((lv, i) => {
            const isHigh = i === closestToHighIdx;
            const isLow = i === closestToLowIdx;
            return (
              <tr key={i} className="hover:bg-gray-700">
                <td className="px-2 py-1 text-gray-400">{i + 1}</td>
                <td className="px-2 py-1 font-medium">{lv.delta}</td>
                <td className={`px-2 py-1 relative ${getTextClass(i, "plus")}`} style={getCellStyle(i, "plus")}>
                  {formatPrice(lv.plus)}
                  {isHigh && (
                    <button
                      onClick={() => setPickingFor({ index: i, side: "plus" })}
                      className="ml-1 text-xs hover:scale-125 cursor-pointer"
                      style={{ color: customColors[cellKey(i, "plus")] || "#6b7280" }}
                      title="Change color"
                    >
                      ●
                    </button>
                  )}
                  {pickingFor?.index === i && pickingFor?.side === "plus" && (
                    <ColorPicker
                      onSelect={handleColorSelect}
                      onClose={() => setPickingFor(null)}
                    />
                  )}
                </td>
                <td className={`px-2 py-1 relative ${getTextClass(i, "minus")}`} style={getCellStyle(i, "minus")}>
                  {formatPrice(lv.minus)}
                  {isLow && (
                    <button
                      onClick={() => setPickingFor({ index: i, side: "minus" })}
                      className="ml-1 text-xs hover:scale-125 cursor-pointer"
                      style={{ color: customColors[cellKey(i, "minus")] || "#6b7280" }}
                      title="Change color"
                    >
                      ●
                    </button>
                  )}
                  {pickingFor?.index === i && pickingFor?.side === "minus" && (
                    <ColorPicker
                      onSelect={handleColorSelect}
                      onClose={() => setPickingFor(null)}
                    />
                  )}
                </td>
                <td className="px-2 py-1 text-gray-400">{i + 1}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isPicking && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setPickingFor(null)}
        />
      )}
    </div>
  );
}

import { formatPrice } from "../utils/formatters";

export default function ResultsTable({ levels, closestToHighIdx, closestToLowIdx }) {
  if (!levels || levels.length === 0) {
    return (
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-600 text-white">
          <tr>
            <th className="px-2 py-1">Δ</th>
            <th className="px-2 py-1">+Δ</th>
            <th className="px-2 py-1">−Δ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="text-center py-4 text-gray-400">
              Results will appear here after calculation.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-600 text-white sticky top-0 bg-gray-800">
          <tr>
            <th className="px-2 py-1">Δ</th>
            <th className="px-2 py-1">+Δ</th>
            <th className="px-2 py-1">−Δ</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((lv, i) => {
            const isHigh = i === closestToHighIdx;
            const isLow = i === closestToLowIdx;
            const plusClass = isHigh
              ? "text-green-300 font-bold"
              : "text-green-400";
            const minusClass = isLow
              ? "text-red-300 font-bold"
              : "text-red-400";
            return (
              <tr key={i} className="hover:bg-gray-700">
                <td className="px-2 py-1 font-medium">{lv.delta}</td>
                <td className={"px-2 py-1 " + plusClass}>{formatPrice(lv.plus)}</td>
                <td className={"px-2 py-1 " + minusClass}>{formatPrice(lv.minus)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

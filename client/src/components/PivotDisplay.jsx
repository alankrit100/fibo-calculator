export default function PivotDisplay({ pivot, sqrtPivot, velo }) {
  return (
    <div className="space-y-2 mb-4 p-4 bg-gray-900 rounded-lg">
      <p className="text-base text-gray-300">
        Pivot: <span className="text-white font-semibold">{pivot.toFixed(2)}</span>
      </p>
      <p className="text-base text-gray-300">
        SQRT: <span className="text-white font-semibold">{sqrtPivot.toFixed(15)}</span>
      </p>
      <p className="text-base text-gray-300">
        Velo: <span className="text-white font-semibold">{isNaN(velo) ? "—" : velo.toFixed(15)}</span>
      </p>
    </div>
  );
}

const COLORS = [
  { label: "Emerald",  hex: "#10b981" },
  { label: "Teal",     hex: "#14b8a6" },
  { label: "Cyan",     hex: "#06b6d4" },
  { label: "Sky",      hex: "#0ea5e9" },
  { label: "Blue",     hex: "#3b82f6" },
  { label: "Indigo",   hex: "#6366f1" },
  { label: "Purple",   hex: "#8b5cf6" },
  { label: "Fuchsia",  hex: "#d946ef" },
  { label: "Pink",     hex: "#ec4899" },
  { label: "Rose",     hex: "#f43f5e" },
  { label: "Red",      hex: "#ef4444" },
  { label: "Orange",   hex: "#f97316" },
  { label: "Amber",    hex: "#f59e0b" },
  { label: "Yellow",   hex: "#eab308" },
  { label: "Lime",     hex: "#84cc16" },
];

export default function ColorPicker({ onSelect, onClose }) {
  return (
    <div
      className="absolute z-20 p-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl grid grid-cols-5 gap-1"
      style={{ minWidth: "180px" }}
    >
      {COLORS.map((c) => (
        <button
          key={c.hex}
          title={c.label}
          onClick={() => onSelect(c.hex)}
          className="w-7 h-7 rounded-full border border-gray-600 hover:scale-125 transition-transform cursor-pointer"
          style={{ backgroundColor: c.hex }}
        />
      ))}
    </div>
  );
}

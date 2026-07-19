export function formatPrice(value) {
  return Number(value).toFixed(2);
}

export function generateCSV(levels, lowerBound, upperBound, meta = {}) {
  const filtered = levels.filter(
    (lv) => lv.delta >= lowerBound && lv.delta <= upperBound
  );

  const header = "S.No,Delta,+Delta,-Delta";
  const rows = filtered.map(
    (lv, i) => `${i + 1},${lv.delta},${formatPrice(lv.plus)},${formatPrice(lv.minus)}`
  );

  return header + "\n" + rows.join("\n");
}

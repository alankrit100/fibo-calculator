export function generateDeltas(maxInteger = 30) {
  const fractionalParts = [0.21, 0.34, 0.55, 0.70, 0.89];
  const deltas = [0.11, 0.21, 0.34, 0.45, 0.55, 0.70, 0.89];

  for (let i = 1; i <= maxInteger; i++) {
    for (const frac of fractionalParts) {
      deltas.push(parseFloat((i + frac).toFixed(2)));
    }
  }

  for (let j = 15; j <= maxInteger; j++) {
    deltas.push(parseFloat(j.toFixed(2)));
  }

  return deltas;
}

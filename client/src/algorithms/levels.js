import { generateDeltas } from "./deltas.js";

export function calculateLevels({ open, high, low, close, manualPivot }) {
  let pivot;
  if (manualPivot != null && !isNaN(manualPivot)) {
    pivot = manualPivot;
  } else {
    pivot = (open + high + low + close) / 4;
  }

  const sqrtPivot = Math.sqrt(pivot);
  const velo = Math.sqrt(high) - Math.sqrt(low);
  const deltas = generateDeltas(30);

  const levels = deltas.map((delta) => ({
    delta,
    plus: Math.pow(sqrtPivot + delta, 2),
    minus: Math.pow(sqrtPivot - delta, 2),
  }));

  let closestToHighIdx = -1;
  let closestToLowIdx = -1;
  let minHighDiff = Infinity;
  let minLowDiff = Infinity;

  levels.forEach((lv, i) => {
    const highDiff = Math.abs(lv.plus - high);
    if (highDiff < minHighDiff) {
      minHighDiff = highDiff;
      closestToHighIdx = i;
    }
    const lowDiff = Math.abs(lv.minus - low);
    if (lowDiff < minLowDiff) {
      minLowDiff = lowDiff;
      closestToLowIdx = i;
    }
  });

  return {
    pivot,
    sqrtPivot,
    velo,
    levels,
    closestToHighIdx,
    closestToLowIdx,
  };
}

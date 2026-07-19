import { describe, it, expect } from "vitest";
import { generateDeltas } from "../client/src/algorithms/deltas.js";
import { calculateLevels } from "../client/src/algorithms/levels.js";

describe("generateDeltas", () => {
  it("should contain seed values", () => {
    const deltas = generateDeltas(30);
    [0.11, 0.21, 0.34, 0.45, 0.55, 0.70, 0.89].forEach((seed) => {
      expect(deltas).toContain(seed);
    });
  });

  it("should contain fractional values up to maxInteger", () => {
    const deltas = generateDeltas(5);
    expect(deltas).toContain(1.21);
    expect(deltas).toContain(2.55);
    expect(deltas).toContain(5.89);
  });

  it("should not contain fractions beyond maxInteger", () => {
    const deltas = generateDeltas(2);
    expect(deltas).not.toContain(3.21);
  });

  it("should contain clean integer values from 15 to maxInteger", () => {
    const deltas = generateDeltas(20);
    expect(deltas).toContain(15);
    expect(deltas).toContain(20);
    expect(deltas).not.toContain(21);
  });
});

describe("calculateLevels", () => {
  const ohlc = { open: 100, high: 110, low: 90, close: 105 };

  it("should compute pivot correctly", () => {
    const res = calculateLevels(ohlc);
    expect(res.pivot).toBe((100 + 110 + 90 + 105) / 4);
  });

  it("should use manual pivot when provided", () => {
    const res = calculateLevels({ ...ohlc, manualPivot: 200 });
    expect(res.pivot).toBe(200);
  });

  it("should identify closest plus level to high", () => {
    const res = calculateLevels(ohlc);
    const closest = res.levels[res.closestToHighIdx];
    const diff = Math.abs(closest.plus - ohlc.high);
    res.levels.forEach((lv) => {
      expect(Math.abs(lv.plus - ohlc.high)).toBeGreaterThanOrEqual(diff - 0.001);
    });
  });

  it("should identify closest minus level to low", () => {
    const res = calculateLevels(ohlc);
    const closest = res.levels[res.closestToLowIdx];
    const diff = Math.abs(closest.minus - ohlc.low);
    res.levels.forEach((lv) => {
      expect(Math.abs(lv.minus - ohlc.low)).toBeGreaterThanOrEqual(diff - 0.001);
    });
  });

  it("should return velo as sqrt(high) - sqrt(low)", () => {
    const res = calculateLevels(ohlc);
    expect(res.velo).toBeCloseTo(Math.sqrt(110) - Math.sqrt(90), 10);
  });
});

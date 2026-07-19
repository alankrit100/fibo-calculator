import { useState, useCallback } from "react";
import InputModeToggle from "./components/InputModeToggle";
import ManualForm from "./components/ManualForm";
import OptionsForm from "./components/OptionsForm";
import PivotDisplay from "./components/PivotDisplay";
import ResultsTable from "./components/ResultsTable";
import ExportControls from "./components/ExportControls";
import { calculateLevels } from "./algorithms/levels";
import { validateOHLC } from "./utils/validation";

export default function App() {
  const [mode, setMode] = useState("manual");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleManualCalculate = useCallback((inputs) => {
    setError(null);

    if (!isNaN(inputs.manualPivot)) {
      const res = calculateLevels({
        open: 0, high: inputs.high, low: inputs.low, close: 0,
        manualPivot: inputs.manualPivot,
      });
      setResults(res);
      return;
    }

    const errMsg = validateOHLC(inputs);
    if (errMsg) {
      setError(errMsg);
      setResults(null);
      return;
    }

    const res = calculateLevels({
      open: inputs.open, high: inputs.high, low: inputs.low, close: inputs.close,
    });
    setResults(res);
  }, []);

  const handleOptionsCalculate = useCallback((inputs) => {
    setError(null);

    if (!isNaN(inputs.manualPivot)) {
      const res = calculateLevels({
        open: 0, high: inputs.high, low: inputs.low, close: 0,
        manualPivot: inputs.manualPivot,
      });
      setResults(res);
      return;
    }

    const errMsg = validateOHLC(inputs);
    if (errMsg) {
      setError(errMsg);
      setResults(null);
      return;
    }

    const res = calculateLevels({
      open: inputs.open, high: inputs.high, low: inputs.low, close: inputs.close,
    });
    setResults(res);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-start justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="md:w-1/2 p-8 border-r border-gray-800">
          <InputModeToggle mode={mode} onChange={setMode} />

          {mode === "manual" && <ManualForm onCalculate={handleManualCalculate} />}

          {mode === "options" && <OptionsForm onCalculate={handleOptionsCalculate} />}

          {error && (
            <div className="mt-4 p-3 bg-red-900 bg-opacity-40 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="md:w-1/2 p-8 bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Fibonacci Levels</h2>

          {results && (
            <>
              <PivotDisplay
                pivot={results.pivot}
                sqrtPivot={results.sqrtPivot}
                velo={results.velo}
              />
              <ResultsTable
                levels={results.levels}
                closestToHighIdx={results.closestToHighIdx}
                closestToLowIdx={results.closestToLowIdx}
              />
              <ExportControls levels={results.levels} />
            </>
          )}

          {!results && (
            <p className="text-gray-400 text-sm">Results will appear here after calculation.</p>
          )}
        </div>
      </div>
    </div>
  );
}

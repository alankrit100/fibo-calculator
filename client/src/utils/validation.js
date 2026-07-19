export function validateOHLC({ open, high, low, close }) {
  if (open == null || isNaN(open)) return "Open value is required";
  if (high == null || isNaN(high)) return "High value is required";
  if (low == null || isNaN(low)) return "Low value is required";
  if (close == null || isNaN(close)) return "Close value is required";
  if (high < low) return "High cannot be less than Low";
  return null;
}

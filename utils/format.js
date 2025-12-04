export function formatCurrency(value) {
  const n = typeof value === "number" ? value : parseFloat(value || 0);
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n).toFixed(2);
  return `${sign}$${abs}`;
}

export function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

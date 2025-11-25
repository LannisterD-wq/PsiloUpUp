export function formatCurrency(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const value = abs / 100;
  const [intStr, decStr] = value.toFixed(2).split(".");
  const withThousands = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}R$ ${withThousands},${decStr}`;
}

export function computeQuote(subtotal: number, discountPct: number, taxPct: number) {
  const discount = Math.round((subtotal * discountPct) / 100);
  const taxable = subtotal - discount;
  const tax = Math.round((taxable * taxPct) / 100);
  return { subtotal, discount, taxable, tax, total: taxable + tax };
}

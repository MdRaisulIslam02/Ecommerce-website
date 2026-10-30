/** All storefront amounts are entered and stored in Bangladeshi taka. */
export const STORE_CURRENCY = "BDT";
export const STORE_LOCALE = "en-BD";
const amountFormatter = new Intl.NumberFormat(STORE_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const wholeAmountFormatter = new Intl.NumberFormat(STORE_LOCALE, { maximumFractionDigits: 0 });
export function formatMoney(amount: number, fractionDigits: 0 | 2 = 2): string {
  return `৳${(fractionDigits === 0 ? wholeAmountFormatter : amountFormatter).format(amount)}`;
}

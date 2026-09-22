const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** "PKR 18,500" (the only price format on the site). */
export const formatPKR = (amount: number) => `PKR ${pkr.format(amount)}`;

/** "18,500" for compact breakdowns ("Frame 18,500 + lenses 9,000"). */
export const formatAmount = (amount: number) => pkr.format(amount);

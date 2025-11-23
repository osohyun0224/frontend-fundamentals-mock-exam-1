import { round } from 'es-toolkit';

export function calculateExpectedAmount(monthlyAmount: number, savingPeriod: number, annualRate: number): number {
  return monthlyAmount * savingPeriod * (1 + (annualRate / 100) * 0.5);
}

export function calculateDifference(targetAmount: number, expectedAmount: number): number {
  return targetAmount - expectedAmount;
}

export function calculateRecommendedMonthlyAmount(
  targetAmount: number,
  savingPeriod: number,
  annualRate: number
): number {
  const rawAmount = targetAmount / (savingPeriod * (1 + (annualRate / 100) * 0.5));
  return round(rawAmount, -3);
}

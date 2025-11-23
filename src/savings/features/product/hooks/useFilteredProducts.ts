import { useMemo } from 'react';
import type { SavingsProduct } from '@/savings/api/savingsProducts';

export function useFilteredProducts(
  products: SavingsProduct[],
  monthlyAmount: string,
  savingPeriod: number
) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const monthlyAmountNum = Number(monthlyAmount.replace(/,/g, ''));

      if (!monthlyAmount || monthlyAmountNum === 0) {
        return true;
      }

      const isMonthlyAmountValid =
        monthlyAmountNum >= product.minMonthlyAmount &&
        monthlyAmountNum <= product.maxMonthlyAmount;

      const isPeriodValid = product.availableTerms === savingPeriod;

      return isMonthlyAmountValid && isPeriodValid;
    });
  }, [products, monthlyAmount, savingPeriod]);

  const recommendedProducts = useMemo(() => {
    return filteredProducts
      .slice()
      .sort((a, b) => b.annualRate - a.annualRate)
      .slice(0, 2);
  }, [filteredProducts]);

  return {
    filteredProducts,
    recommendedProducts,
  };
}


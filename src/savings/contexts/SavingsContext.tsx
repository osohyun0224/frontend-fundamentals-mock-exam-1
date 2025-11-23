import { createContext, useContext, ReactNode } from 'react';
import type { SavingsProduct } from '@/savings/api/savingsProducts';

interface SavingsContextValue {
  targetAmount: string;
  monthlyAmount: string;
  savingPeriod: number;

  setTargetAmount: (value: string) => void;
  setMonthlyAmount: (value: string) => void;
  setSavingPeriod: (value: number) => void;

  selectedProductId: string | null;
  selectedProduct: SavingsProduct | undefined;
  setSelectedProductId: (id: string | null) => void;

  filteredProducts: SavingsProduct[];
  recommendedProducts: SavingsProduct[];
}

const SavingsContext = createContext<SavingsContextValue | null>(null);

export function SavingsProvider({ children, value }: { children: ReactNode; value: SavingsContextValue }) {
  return <SavingsContext.Provider value={value}>{children}</SavingsContext.Provider>;
}

export function useSavingsContext() {
  const context = useContext(SavingsContext);

  if (!context) {
    throw new Error('useSavingsContext는 반드시 SavingsProvider 내에서 사용되어야 합니다.');
  }

  return context;
}

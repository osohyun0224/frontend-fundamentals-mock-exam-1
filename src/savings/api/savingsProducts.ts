import { http } from 'tosslib';

export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export async function fetchSavingsProducts(): Promise<SavingsProduct[]> {
  return http.get<SavingsProduct[]>('/api/savings-products');
}

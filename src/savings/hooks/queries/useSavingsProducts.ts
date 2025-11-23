import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@/savings/queryKeys';
import { fetchSavingsProducts } from '@/savings/api/savingsProducts';

export function useSavingsProducts() {
  return useSuspenseQuery({
    queryKey: queryKeys.savingsProducts,
    queryFn: fetchSavingsProducts,
  });
}

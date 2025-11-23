import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@/queryKeys';
import { fetchSavingsProducts } from '@/api/savingsProducts';

export function useSavingsProducts() {
  return useSuspenseQuery({
    queryKey: queryKeys.savingsProducts,
    queryFn: fetchSavingsProducts,
  });
}


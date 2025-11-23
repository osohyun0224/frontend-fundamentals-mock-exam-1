import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/queryKeys';
import { fetchSavingsProducts } from '@/api/savingsProducts';

export function useSavingsProducts() {
  return useQuery({
    queryKey: queryKeys.savingsProducts,
    queryFn: fetchSavingsProducts,
  });
}


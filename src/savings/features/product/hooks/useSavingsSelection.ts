import { useState, useMemo } from 'react';
import type { SavingsProduct } from '@/savings/api/savingsProducts';

export function useSavingsSelection(products: SavingsProduct[]) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(() => {
    return products.find(product => product.id === selectedProductId);
  }, [products, selectedProductId]);

  return {
    selectedProductId,
    selectedProduct,
    setSelectedProductId,
  };
}

import { useSavingsProducts } from '@/savings/hooks/queries/useSavingsProducts';
import { useSavingsInput } from '@/savings/features/input/hooks/useSavingsInput';
import { useSavingsSelection } from '@/savings/features/product/hooks/useSavingsSelection';
import { useFilteredProducts } from '@/savings/features/product/hooks/useFilteredProducts';

export function useSavingsCalculator() {
  const { data: products = [] } = useSavingsProducts();

  const inputState = useSavingsInput();

  const { filteredProducts, recommendedProducts } = useFilteredProducts(
    products,
    inputState.monthlyAmount,
    inputState.savingPeriod
  );

  const selectionState = useSavingsSelection(products);

  return {
    targetAmount: inputState.targetAmount,
    monthlyAmount: inputState.monthlyAmount,
    savingPeriod: inputState.savingPeriod,
    setTargetAmount: inputState.setTargetAmount,
    setMonthlyAmount: inputState.setMonthlyAmount,
    setSavingPeriod: inputState.setSavingPeriod,

    selectedProductId: selectionState.selectedProductId,
    selectedProduct: selectionState.selectedProduct,
    setSelectedProductId: selectionState.setSelectedProductId,

    filteredProducts,
    recommendedProducts,
  };
}


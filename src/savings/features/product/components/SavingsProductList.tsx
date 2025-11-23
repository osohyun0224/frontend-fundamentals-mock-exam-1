import { useSavingsContext } from '@/savings/contexts/SavingsContext';
import { SavingsProductItem } from './SavingsProductItem';

export function SavingsProductList() {
  const { filteredProducts } = useSavingsContext();

  return (
    <div key="products-tab">
      {filteredProducts.map((product) => (
        <SavingsProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}


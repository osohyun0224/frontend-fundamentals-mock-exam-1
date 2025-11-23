import { colors, ListRow } from 'tosslib';
import { useSavingsContext } from '@/savings/contexts/SavingsContext';
import { SavingsProductItem } from './SavingsProductItem';

export function SavingsProductList() {
  const { filteredProducts } = useSavingsContext();

  if (filteredProducts.length === 0) {
    return (
      <div key="products-tab" role="status" aria-live="polite">
        <ListRow
          contents={
            <ListRow.Texts
              type="2RowTypeA"
              top="조건에 부합하는 상품이 없습니다"
              topProps={{ color: colors.grey700, fontWeight: 'medium' }}
              bottom="월 납입액이나 저축 기간을 조정해보세요"
              bottomProps={{ color: colors.grey500, fontSize: 14 }}
            />
          }
        />
      </div>
    );
  }

  return (
    <div key="products-tab" role="list" aria-label="적금 상품 목록">
      {filteredProducts.map(product => (
        <div key={product.id} role="listitem">
          <SavingsProductItem product={product} />
        </div>
      ))}
    </div>
  );
}

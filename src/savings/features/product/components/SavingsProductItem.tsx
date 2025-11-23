import { Assets, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '@/savings/api/savingsProducts';
import { formatNumber } from '@/savings/utils/formatters';
import { useSavingsContext } from '@/savings/contexts/SavingsContext';

interface SavingsProductItemProps {
  product: SavingsProduct;
}

export function SavingsProductItem({ product }: SavingsProductItemProps) {
  const { selectedProductId, setSelectedProductId } = useSavingsContext();
  const isSelected = selectedProductId === product.id;

  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={product.name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${product.annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${formatNumber(product.minMonthlyAmount)}원 ~ ${formatNumber(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : null}
      onClick={() => setSelectedProductId(isSelected ? null : product.id)}
    />
  );
}


import { css } from '@emotion/react';
import { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProductId(isSelected ? null : product.id)}
      style={{ cursor: 'pointer' }}
    >
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={product.name}
            topProps={{
              fontSize: 16,
              fontWeight: 'bold',
              color: isHovered ? colors.blue600 : colors.grey900,
              css: css`
                transition: color 0.2s ease;
              `,
            }}
            middle={`연 이자율: ${product.annualRate}%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`${formatNumber(product.minMonthlyAmount)}원 ~ ${formatNumber(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : null}
      />
    </div>
  );
}

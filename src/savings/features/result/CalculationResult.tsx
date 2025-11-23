import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { formatNumber, parseFormattedNumber } from '@/savings/utils/formatters';
import {
  calculateExpectedAmount,
  calculateDifference,
  calculateRecommendedMonthlyAmount,
} from '@/savings/utils/calculators';
import { SavingsProductItem } from '../product/components/SavingsProductItem';
import { useSavingsContext } from '@/savings/contexts/SavingsContext';

export function CalculationResult() {
  const { selectedProduct, targetAmount, monthlyAmount, savingPeriod, recommendedProducts } = useSavingsContext();

  if (!selectedProduct) {
    return (
      <div key="results-tab">
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      </div>
    );
  }

  const targetAmountNum = parseFormattedNumber(targetAmount);
  const monthlyAmountNum = parseFormattedNumber(monthlyAmount);

  const expectedAmount = calculateExpectedAmount(monthlyAmountNum, savingPeriod, selectedProduct.annualRate);
  const difference = calculateDifference(targetAmountNum, expectedAmount);
  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount(
    targetAmountNum,
    savingPeriod,
    selectedProduct.annualRate
  );

  return (
    <div key="results-tab">
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">선택한 상품</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <SavingsProductItem product={selectedProduct} />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(expectedAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(difference)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(recommendedMonthlyAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommendedProducts.map(product => (
        <SavingsProductItem key={product.id} product={product} />
      ))}

      <Spacing size={40} />
    </div>
  );
}

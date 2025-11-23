import { useState } from 'react';
import {
  Assets,
  Border,
  colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { useSavingsProducts } from '@/hooks/queries/useSavingsProducts';
import type { SavingsProduct } from '@/api/savingsProducts';

function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

function calculateExpectedAmount(monthlyAmount: number, savingPeriod: number, annualRate: number): number {
  return monthlyAmount * savingPeriod * (1 + annualRate / 100 * 0.5);
}

function calculateDifference(targetAmount: number, expectedAmount: number): number {
  return targetAmount - expectedAmount;
}

function calculateRecommendedMonthlyAmount(targetAmount: number, savingPeriod: number, annualRate: number): number {
  const rawAmount = targetAmount / (savingPeriod * (1 + annualRate / 100 * 0.5));
  return Math.round(rawAmount / 1000) * 1000;
}

export function SavingsCalculatorPage() {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [savingPeriod, setSavingPeriod] = useState(12);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');

  const { data: products = [] } = useSavingsProducts();

  const filteredProducts = products.filter((product: SavingsProduct) => {
    const monthlyAmountNum = Number(monthlyAmount.replace(/,/g, ''));

    if (!monthlyAmount || monthlyAmountNum === 0) {
      return true;
    }

    const isMonthlyAmountValid =
      monthlyAmountNum >= product.minMonthlyAmount && monthlyAmountNum <= product.maxMonthlyAmount;

    const isPeriodValid = product.availableTerms === savingPeriod;

    return isMonthlyAmountValid && isPeriodValid;
  });

  const selectedProduct = products.find((product: SavingsProduct) => product.id === selectedProductId);

  const recommendedProducts = filteredProducts
    .sort((a: SavingsProduct, b: SavingsProduct) => b.annualRate - a.annualRate)
    .slice(0, 2);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmount}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          setTargetAmount(value ? formatNumber(Number(value)) : '');
        }}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmount}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          setMonthlyAmount(value ? formatNumber(Number(value)) : '');
        }}
      />
      <Spacing size={16} />
      <SelectBottomSheet<number>
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingPeriod}
        onChange={setSavingPeriod}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab
        onChange={(value) => {
          if (value === 'products' || value === 'results') {
            setActiveTab(value);
          }
        }}
      >
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === 'products' ? (
        <>
          {filteredProducts.map((product: SavingsProduct) => {
            const isSelected = selectedProductId === product.id;

            return (
              <ListRow
                key={product.id}
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
                onClick={() => setSelectedProductId(product.id)}
              />
            );
          })}
        </>
      ) : (
        <>
          {selectedProduct ? (
            <>
              <Spacing size={8} />

              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="예상 수익 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={`${formatNumber(
                      calculateExpectedAmount(
                        Number(monthlyAmount.replace(/,/g, '')),
                        savingPeriod,
                        selectedProduct.annualRate
                      )
                    )}원`}
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
                    bottom={`${formatNumber(
                      calculateDifference(
                        Number(targetAmount.replace(/,/g, '')),
                        calculateExpectedAmount(
                          Number(monthlyAmount.replace(/,/g, '')),
                          savingPeriod,
                          selectedProduct.annualRate
                        )
                      )
                    )}원`}
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
                    bottom={`${formatNumber(
                      calculateRecommendedMonthlyAmount(
                        Number(targetAmount.replace(/,/g, '')),
                        savingPeriod,
                        selectedProduct.annualRate
                      )
                    )}원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />

              <Spacing size={8} />
              <Border height={16} />
              <Spacing size={8} />

              <ListHeader
                title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>}
              />
              <Spacing size={12} />

              {recommendedProducts.map((product: SavingsProduct) => {
                const isSelected = selectedProductId === product.id;

                return (
                  <ListRow
                    key={product.id}
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
                    onClick={() => setSelectedProductId(product.id)}
                  />
                );
              })}

              <Spacing size={40} />
            </>
          ) : (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
          )}
        </>
      )}
    </>
  );
}

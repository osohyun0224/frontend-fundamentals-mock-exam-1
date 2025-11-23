import { useState } from 'react';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { useSavingsCalculator } from '@/savings/hooks/useSavingsCalculator';
import { SavingsProvider } from '@/savings/contexts/SavingsContext';
import { SavingsInputForm } from '@/savings/features/input/components/SavingsInputForm';
import { SavingsProductList } from '@/savings/features/product/components/SavingsProductList';
import { CalculationResult } from '@/savings/features/result/CalculationResult';

export function SavingsCalculatorPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');

  const savingsData = useSavingsCalculator();
  const {
    targetAmount,
    monthlyAmount,
    savingPeriod,
    setTargetAmount,
    setMonthlyAmount,
    setSavingPeriod,
  } = savingsData;

  return (
    <SavingsProvider value={savingsData}>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsInputForm
        targetAmount={targetAmount}
        monthlyAmount={monthlyAmount}
        savingPeriod={savingPeriod}
        onTargetAmountChange={setTargetAmount}
        onMonthlyAmountChange={setMonthlyAmount}
        onSavingPeriodChange={setSavingPeriod}
      />

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

      {activeTab === 'products' ? <SavingsProductList /> : <CalculationResult />}
    </SavingsProvider>
  );
}

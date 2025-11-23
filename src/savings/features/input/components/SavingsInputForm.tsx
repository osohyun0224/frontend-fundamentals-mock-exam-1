import { Spacing } from 'tosslib';
import { useSavingsContext } from '@/savings/contexts/SavingsContext';
import { AmountField } from './AmountField';
import { PeriodField } from './PeriodField';

export function SavingsInputForm() {
  const {
    targetAmount,
    monthlyAmount,
    savingPeriod,
    setTargetAmount,
    setMonthlyAmount,
    setSavingPeriod,
  } = useSavingsContext();

  return (
    <>
      <AmountField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        value={targetAmount}
        onChange={setTargetAmount}
      />
      <Spacing size={16} />
      <AmountField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        value={monthlyAmount}
        onChange={setMonthlyAmount}
      />
      <Spacing size={16} />
      <PeriodField value={savingPeriod} onChange={setSavingPeriod} />
    </>
  );
}


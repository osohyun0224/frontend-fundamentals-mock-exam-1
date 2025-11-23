import { Spacing } from 'tosslib';
import { AmountField } from './AmountField';
import { PeriodField } from './PeriodField';

interface SavingsInputFormProps {
  targetAmount: string;
  monthlyAmount: string;
  savingPeriod: number;
  onTargetAmountChange: (value: string) => void;
  onMonthlyAmountChange: (value: string) => void;
  onSavingPeriodChange: (value: number) => void;
}

export function SavingsInputForm({
  targetAmount,
  monthlyAmount,
  savingPeriod,
  onTargetAmountChange,
  onMonthlyAmountChange,
  onSavingPeriodChange,
}: SavingsInputFormProps) {
  return (
    <>
      <AmountField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        value={targetAmount}
        onChange={onTargetAmountChange}
      />
      <Spacing size={16} />
      <AmountField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        value={monthlyAmount}
        onChange={onMonthlyAmountChange}
      />
      <Spacing size={16} />
      <PeriodField value={savingPeriod} onChange={onSavingPeriodChange} />
    </>
  );
}


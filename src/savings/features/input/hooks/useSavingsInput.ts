import { useState } from 'react';

export function useSavingsInput() {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [savingPeriod, setSavingPeriod] = useState(12);

  return {
    targetAmount,
    monthlyAmount,
    savingPeriod,
    setTargetAmount,
    setMonthlyAmount,
    setSavingPeriod,
  };
}

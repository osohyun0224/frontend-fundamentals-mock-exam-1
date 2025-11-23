import { TextField } from 'tosslib';
import { formatNumber } from '@/savings/utils/formatters';

interface AmountFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function AmountField({ label, placeholder, value, onChange }: AmountFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    
    onChange(numericValue ? formatNumber(Number(numericValue)) : '');
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      suffix="원"
      value={value}
      onChange={handleChange}
    />
  );
}


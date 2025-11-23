import { SelectBottomSheet } from 'tosslib';

interface PeriodFieldProps {
  value: number;
  onChange: (value: number) => void;
  options?: { value: number; label: string }[];
}

const DEFAULT_OPTIONS = [
  { value: 6, label: '6개월' },
  { value: 12, label: '12개월' },
  { value: 24, label: '24개월' },
];

export function PeriodField({ value, onChange, options = DEFAULT_OPTIONS }: PeriodFieldProps) {
  return (
    <SelectBottomSheet<number>
      label="저축 기간"
      title="저축 기간을 선택해주세요"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <SelectBottomSheet.Option key={option.value} value={option.value}>
          {option.label}
        </SelectBottomSheet.Option>
      ))}
    </SelectBottomSheet>
  );
}


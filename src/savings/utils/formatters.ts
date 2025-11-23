export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

export function parseFormattedNumber(value: string): number {
  return Number(value.replace(/,/g, ''));
}


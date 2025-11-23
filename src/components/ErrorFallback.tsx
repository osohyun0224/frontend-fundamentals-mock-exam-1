import type { ErrorBoundaryFallbackProps } from '@suspensive/react';
import { Button, colors, Spacing, Text } from 'tosslib';

export function ErrorFallback({ error, reset }: ErrorBoundaryFallbackProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <Text color={colors.grey900} fontSize={20} fontWeight="bold">
        문제가 발생했습니다
      </Text>
      <Spacing size={8} />
      <Text color={colors.grey600} fontSize={14}>
        {error.message}
      </Text>
      <Spacing size={24} />
      <Button onClick={reset} theme="primary" size="medium">
        다시 시도
      </Button>
    </div>
  );
}

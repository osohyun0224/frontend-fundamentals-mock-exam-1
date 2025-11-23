import type { ErrorBoundaryFallbackProps } from '@suspensive/react';
import { Button, colors, Spacing, Text } from 'tosslib';

export function ErrorFallback({ error, reset }: ErrorBoundaryFallbackProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-labelledby="error-title"
      aria-describedby="error-message"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div id="error-title">
        <Text color={colors.grey900} fontSize={20} fontWeight="bold">
          문제가 발생했습니다
        </Text>
      </div>
      <Spacing size={8} />
      <div id="error-message">
        <Text color={colors.grey600} fontSize={14}>
          {error.message}
        </Text>
      </div>
      <Spacing size={24} />
      <Button onClick={reset} theme="primary" size="medium" aria-label="오류 복구를 위해 다시 시도">
        다시 시도
      </Button>
    </div>
  );
}

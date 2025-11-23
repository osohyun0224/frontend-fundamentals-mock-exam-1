import { css, keyframes } from '@emotion/react';
import { colors, Spacing, Text } from 'tosslib';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
      }}
    >
      <div
        css={css`
          width: 40px;
          height: 40px;
          border: 4px solid ${colors.grey200};
          border-top-color: ${colors.blue600};
          border-radius: 50%;
          animation: ${spin} 0.8s linear infinite;
        `}
      />
      <Spacing size={16} />
      <Text color={colors.grey600} fontSize={14}>
        데이터를 불러오는 중입니다...
      </Text>
    </div>
  );
}

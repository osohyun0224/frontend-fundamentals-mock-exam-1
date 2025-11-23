# 토스 적금 계산기

> 목표 금액을 달성하기 위한 월 납입액을 계산하고, 최적의 적금 상품을 추천받을 수 있는 서비스

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

## 목차

- [토스 적금 계산기](#토스-적금-계산기)
  - [목차](#목차)
  - [개발 환경 세팅](#개발-환경-세팅)
    - [필수 요구사항](#필수-요구사항)
    - [설치 및 실행](#설치-및-실행)
    - [브라우저에서 확인](#브라우저에서-확인)
    - [기타 명령어](#기타-명령어)
  - [🎯 리뷰 포인트](#-리뷰-포인트)
    - [1. 도메인 기반 아키텍처 설계](#1-도메인-기반-아키텍처-설계)
    - [2. 훅 분리 전략과 Context API 활용](#2-훅-분리-전략과-context-api-활용)
    - [3. TanStack Query 아키텍처와 에러 처리](#3-tanstack-query-아키텍처와-에러-처리)
  - [프로젝트 구조](#프로젝트-구조)
  - [기술 스택](#기술-스택)
  - [주요 기능](#주요-기능)
    - [1. 적금 상품 목록](#1-적금-상품-목록)
    - [2. 저축 목표 입력](#2-저축-목표-입력)
    - [3. 상품 필터링](#3-상품-필터링)
    - [4. 상품 선택](#4-상품-선택)
    - [5. 계산 결과](#5-계산-결과)
    - [6. 추천 상품](#6-추천-상품)
  - [UX 개선 사항](#ux-개선-사항)
    - [1. 호버 인터랙션](#1-호버-인터랙션)
    - [2. 토글 선택 기능](#2-토글-선택-기능)
    - [3. 빈 상태 처리](#3-빈-상태-처리)
    - [4. 선택 상품 정보 표시](#4-선택-상품-정보-표시)
    - [5. 에러 처리](#5-에러-처리)
    - [6. 로딩 상태](#6-로딩-상태)
  - [아키텍처 설계](#아키텍처-설계)
    - [1. 도메인 기반 구조 (DDD)](#1-도메인-기반-구조-ddd)
    - [2. TanStack Query 아키텍처](#2-tanstack-query-아키텍처)
    - [3. 관심사 분리 (Separation of Concerns)](#3-관심사-분리-separation-of-concerns)
    - [4. Props Drilling 제거](#4-props-drilling-제거)
    - [5. 필드 단위 응집도](#5-필드-단위-응집도)
    - [6. React의 key를 활용한 상태 관리](#6-react의-key를-활용한-상태-관리)
      - [문제 상황: Tab 컴포넌트의 반응형 레이아웃 깨짐](#문제-상황-tab-컴포넌트의-반응형-레이아웃-깨짐)
      - [해결 방법: key를 활용한 명시적 제어](#해결-방법-key를-활용한-명시적-제어)
  - [접근성 (Accessibility)](#접근성-accessibility)
    - [1. ARIA 속성](#1-aria-속성)
    - [2. 키보드 네비게이션](#2-키보드-네비게이션)
    - [3. 애니메이션 접근성](#3-애니메이션-접근성)
    - [4. 시맨틱 HTML](#4-시맨틱-html)
  - [에러 처리 전략](#에러-처리-전략)
    - [QueryErrorResetBoundary의 필요성](#queryerrorresetboundary의-필요성)

---

## 개발 환경 세팅

### 필수 요구사항
- **Node.js**: 18.12.0 이상 (권장: 22.x)
- **Yarn**: 4.6.0 (Berry)

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone <repository-url>
cd frontend-fundamentals-mock-exam-1

# 2. 의존성 설치
yarn install

# 3. 개발 서버 실행 (포트: 5173)
yarn dev

# 4. 새 터미널에서 API 서버 실행 (포트: 3000)
node server.mjs
```

### 브라우저에서 확인
- **프론트엔드**: http://localhost:5173
- **API 서버**: http://localhost:3000

### 기타 명령어

```bash
# 프로덕션 빌드
yarn build

# 빌드 결과 미리보기
yarn preview

# 린트 검사
yarn lint

# 코드 포맷팅
yarn prettier --write .

# TypeScript 타입 체크
yarn tsc --noEmit
```

## 🎯 리뷰 포인트

이 프로젝트는 "유지보수와 장기적인 확장성을 고려한 설계"에 집중하여 구현했습니다. 특히 다음 세 가지 관점에서 리뷰를 받고 싶습니다:

### 1. 도메인 기반 아키텍처 설계

**구현 의도:**
- 단순히 "동작하는 코드"가 아닌, 6개월 후에도 쉽게 수정할 수 있는 구조를 목표로 했습니다.
- 새로운 금융 상품(예: 예금, 펀드)이 추가되어도 기존 코드에 영향을 주지 않도록 설계했습니다.

**핵심 결정사항:**
```
src/savings/                    # Savings 도메인 완전 격리
├── features/                   # 기능별 수직 분할
│   ├── input/                 # 입력 관련 모든 것
│   │   ├── components/
│   │   └── hooks/
│   ├── product/               # 상품 관련 모든 것
│   │   ├── components/
│   │   └── hooks/
│   └── result/                # 결과 관련 모든 것
├── api/                       # API 레이어 분리
├── contexts/                  # 도메인 전역 상태
└── utils/                     # 도메인 유틸리티
```

**질문:**
- 이 구조가 실제 프로덕션 환경에서 확장성을 갖추고 있나요?
- `features/` 내부를 `input`, `product`, `result`로 나눈 기준이 적절한가요?
- 더 나은 폴더 구조가 있을까요?

### 2. 훅 분리 전략과 Context API 활용

**구현 의도:**
- 초기에는 모든 로직이 `useSavingsCalculator` 하나에 있었습니다 (200+ 줄).
- "한 훅이 너무 많은 책임을 가진다"는 피드백을 받고 분리했습니다.

**분리 전략:**
```typescript
// 1단계: 관심사별 분리
useSavingsInput()        // 상태: targetAmount, monthlyAmount, savingPeriod
useSavingsSelection()    // 상태: selectedProductId, selectedProduct
useFilteredProducts()    // 계산: filteredProducts, recommendedProducts

// 2단계: 조합 훅
useSavingsCalculator()   // 위 3개 훅을 조합하여 통합 인터페이스 제공

// 3단계: Context로 Props Drilling 제거
SavingsContext           // 모든 상태를 Context로 제공
```

**Before (Props Drilling):**
```typescript
<SavingsProductList 
  filteredProducts={filteredProducts}
  selectedProductId={selectedProductId}
  setSelectedProductId={setSelectedProductId}
/>
```

**After (Context):**
```typescript
<SavingsProductList /> // props 없음!!!
```

**질문:**
- 훅을 이 정도로 분리한 것이 과한가요, 아니면 적절한가요?
- Context를 도입한 시점이 적절했나요? (처음부터 vs 필요할 때)
- 더 나은 상태 관리 방법이 있을까요?

### 3. TanStack Query 아키텍처와 에러 처리

**구현 의도:**
- TkDodo's Blog의 Query Key Factory 패턴을 적용했습니다.
- `QueryErrorResetBoundary`를 통해 React Query의 캐시된 에러 상태를 올바르게 초기화합니다.

**핵심 구조:**
```typescript
// 1. Query Key 중앙 관리
export const queryKeys = {
  savingsProducts: ['savings-products'] as const,
};

// 2. API 함수 분리
export async function fetchSavingsProducts(): Promise<SavingsProduct[]> {
  return http.get<SavingsProduct[]>('/api/savings-products');
}

// 3. Custom Hook으로 캡슐화
export function useSavingsProducts() {
  return useSuspenseQuery({
    queryKey: queryKeys.savingsProducts,
    queryFn: fetchSavingsProducts,
  });
}

// 4. QueryErrorResetBoundary로 에러 복구
<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary onReset={reset} fallback={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <SavingsCalculatorPage />
      </Suspense>
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
```

**왜 QueryErrorResetBoundary가 필요한가?**
- React Query는 에러를 캐싱하기 때문에, 단순 `ErrorBoundary` 리셋만으로는 복구 불가
- `reset` 함수가 하위 모든 쿼리의 에러 상태를 초기화해야 "다시 시도" 버튼이 작동

**질문:**
- 이 정도 규모의 프로젝트에서 Query Key Factory 패턴이 과한가요?
- `useSuspenseQuery` vs `useQuery` 선택이 적절했나요?
- 에러 처리 전략이 프로덕션 수준인가요?

-----

위 세 가지 관점(도메인 아키텍처, 훅 분리 전략, TanStack Query 구조)에 대해 모두 피드백을 받고 싶습니다. 특히:

1. **실무 관점에서 이 코드의 유지보수성은 몇 점인가요?** (10점 만점)
   - 6개월 후 다른 개발자가 기능을 추가한다면?
   - 어떤 부분이 가장 개선이 필요한가요?

2. **과한 추상화 vs 적절한 추상화**
   - 훅 분리, Context 도입, 컴포넌트 분리가 적절한 수준인가요?
   - 어떤 부분이 오버엔지니어링인가요?

## 프로젝트 구조

```
src/
├── components/              # 공통 컴포넌트
│   ├── ErrorFallback.tsx   # 에러 폴백 UI
│   └── LoadingFallback.tsx # 로딩 폴백 UI
├── pages/
│   ├── Routes.tsx          # 라우팅 설정
│   └── SavingsCalculatorPage.tsx
└── savings/                 # Savings 도메인
    ├── api/                # API 호출 함수
    ├── queryKeys/          # TanStack Query Key 관리
    ├── features/           # 기능별 그룹화
    │   ├── input/          # 입력 관련
    │   │   ├── components/
    │   │   └── hooks/
    │   ├── product/        # 상품 관련
    │   │   ├── components/
    │   │   └── hooks/
    │   └── result/         # 결과 관련
    ├── contexts/           # Context API
    ├── hooks/              # 도메인 공통 훅
    └── utils/              # 유틸리티 함수
```

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **TanStack Query** - 서버 상태 관리
- **@suspensive/react** - Suspense & ErrorBoundary
- **Emotion** - CSS-in-JS
- **Vite** - 빌드 도구
- **tosslib** - Toss 디자인 시스템
- **es-toolkit** - 현대적인 JavaScript 유틸리티 라이브러리

## 주요 기능

### 1. 적금 상품 목록
- 서버에서 적금 상품 데이터를 불러와 표시
- 금액은 천 단위 콤마로 포맷팅

### 2. 저축 목표 입력
- **목표 금액**: 달성하고자 하는 금액
- **월 납입액**: 매월 납입할 금액
- **저축 기간**: 6개월, 12개월, 24개월 중 선택

### 3. 상품 필터링
입력한 조건에 맞는 상품만 표시:
- 월 납입액이 상품의 최소/최대 범위 내에 있어야 함
- 저축 기간이 상품의 가능 기간과 일치해야 함

### 4. 상품 선택
- 하나의 상품만 선택 가능
- 선택된 상품은 체크 아이콘으로 표시
- 다시 클릭하면 선택 취소 (토글 방식)

### 5. 계산 결과
선택한 상품 기준으로 계산:
- **예상 수익 금액**: `월 납입액 × 저축 기간 × (1 + 연이자율 × 0.5)`
- **목표 금액과의 차이**: `목표 금액 - 예상 수익 금액`
- **추천 월 납입 금액**: `목표 금액 ÷ (저축 기간 × (1 + 연이자율 × 0.5))` (1,000원 단위 반올림)

### 6. 추천 상품
- 필터링된 상품 중 연 이자율이 가장 높은 2개 상품 추천
- 선택된 상품이 추천 목록에 있으면 체크 아이콘 표시

## UX 개선 사항

### 1. 호버 인터랙션
상품 목록에서 마우스를 올리면 제목 색상이 연 이자율 색상(파란색)으로 변경되어 선택 가능함을 시각적으로 표현합니다.


```typescript
const [isHovered, setIsHovered] = useState(false);

topProps={{
  color: isHovered ? colors.blue600 : colors.grey900,
  css: css`
    transition: color 0.2s ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,
}}
```

### 2. 토글 선택 기능
이미 선택된 상품을 다시 클릭하면 선택이 취소됩니다. 새로고침 없이도 선택을 해제할 수 있어 더 나은 사용자 경험을 제공합니다.

```typescript
onClick={() => setSelectedProductId(isSelected ? null : product.id)}
```

### 3. 빈 상태 처리
필터링 조건에 맞는 상품이 없을 때 안내 메시지를 표시하여 사용자가 조건을 조정할 수 있도록 유도합니다.

```typescript
if (filteredProducts.length === 0) {
  return (
    <div role="status" aria-live="polite">
      <ListRow contents={
        <ListRow.Texts
          type="2RowTypeA"
          top="조건에 부합하는 상품이 없습니다"
          bottom="월 납입액이나 저축 기간을 조정해보세요"
        />
      } />
    </div>
  );
}
```

### 4. 선택 상품 정보 표시
계산 결과 탭에서 현재 선택된 상품의 정보를 상단에 명확하게 표시하여, 어떤 상품을 기준으로 계산되었는지 쉽게 확인할 수 있습니다.

```typescript
<ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">선택한 상품</ListHeader.TitleParagraph>} />
<SavingsProductItem product={selectedProduct} />
```

### 5. 에러 처리
- `@suspensive/react`의 `ErrorBoundary`로 API 에러를 우아하게 처리
- `QueryErrorResetBoundary`와 함께 사용하여 React Query의 캐시된 에러 상태를 올바르게 초기화
- "다시 시도" 버튼으로 복구 가능

### 6. 로딩 상태
- `@suspensive/react`의 `Suspense`로 데이터 로딩 중 스피너 표시
- 부드러운 사용자 경험 제공

## 아키텍처 설계

### 1. 도메인 기반 구조 (DDD)
모든 Savings 관련 코드를 `src/savings/` 폴더에 응집하여 유지보수성과 확장성을 향상시켰습니다.

**장점:**
- 도메인 삭제 시 `src/savings/` 폴더만 제거하면 됨
- 새로운 도메인 추가 시 독립적으로 개발 가능
- 높은 응집도, 낮은 결합도

### 2. TanStack Query 아키텍처
[TkDodo's Blog](https://tkdodo.eu/blog/effective-react-query-keys)의 Query Key Factory 패턴을 따라 구조화했습니다.

```
src/savings/
├── api/              # API 호출 함수
│   └── savingsProducts.ts
├── hooks/
│   └── queries/      # Custom Query Hooks
│       └── useSavingsProducts.ts
└── queryKeys/        # Query Key 중앙 관리
    └── index.ts
```

**장점:**
- Query Key를 중앙에서 관리하여 캐시 무효화가 쉬움
- API 호출 로직과 React 훅을 분리하여 테스트 용이
- 일관된 네이밍 컨벤션 유지

```typescript
// queryKeys/index.ts
export const queryKeys = {
  savingsProducts: ['savings-products'] as const,
};

// hooks/queries/useSavingsProducts.ts
export function useSavingsProducts() {
  return useSuspenseQuery({
    queryKey: queryKeys.savingsProducts,
    queryFn: fetchSavingsProducts,
  });
}
```

### 3. 관심사 분리 (Separation of Concerns)
각 훅이 단일 책임만 가지도록 설계:

```typescript
useSavingsInput()        // 입력 값만 관리
useSavingsSelection()    // 선택만 관리
useFilteredProducts()    // 필터링/추천만 관리
useSavingsCalculator()   // 위 훅들을 조합
```

### 4. Props Drilling 제거
Context API를 사용하여 중간 컴포넌트의 불필요한 props 전달을 제거했습니다.

```typescript
// 이전: 5-6개의 props 전달하는 복잡한 구조였습니다.
<SavingsProductList 
  filteredProducts={...}
  selectedProductId={...}
  setSelectedProductId={...}
/>

// 현재: Context로 해결해 복잡한 props 를 줄였습니다.
<SavingsProductList />
```

### 5. 필드 단위 응집도
각 입력 필드를 독립적인 컴포넌트로 분리하여 재사용성을 높였습니다.

```typescript
<AmountField />  // 금액 입력 + 포맷팅
<PeriodField />  // 기간 선택 + 옵션
```

### 6. React의 key를 활용한 상태 관리

#### 문제 상황: Tab 컴포넌트의 반응형 레이아웃 깨짐

초기 구현에서는 `&&` 연산자로 조건부 렌더링을 했습니다:

```typescript
// 문제가 있는 코드
<div role="tabpanel">
  {activeTab === 'products' && <SavingsProductList />}
  {activeTab === 'results' && <CalculationResult />}
</div>
```

**발생한 문제:**
- Tab 컴포넌트의 활성 상태 표시(밑줄)가 화면 전체 너비로 늘어남
- 반응형 레이아웃이 깨짐
- `&&` 연산자가 `false`를 반환하여 DOM 구조가 불안정해짐

#### 해결 방법: key를 활용한 명시적 제어

[React 공식 문서](https://ko.react.dev/learn/preserving-and-resetting-state)의 "상태 보존과 리셋" 패턴을 적용했습니다. React는 UI 트리에서 컴포넌트의 위치를 기준으로 상태를 추적하는데, `key`를 사용하면 "같은 위치에 있어도 다른 컴포넌트"임을 명시적으로 알릴 수 있습니다.

```typescript
// 해결된 코드
<div 
  role="tabpanel" 
  key={activeTab === 'products' ? 'products-tab' : 'results-tab'}
>
  {activeTab === 'products' ? <SavingsProductList /> : <CalculationResult />}
</div>
```

**핵심 개선사항:**

1. **일관된 DOM 구조**: `&&` 대신 삼항 연산자 사용
   - `&&`는 `false` 값을 DOM에 남겨 구조를 불안정하게 만듦
   - 삼항 연산자는 항상 하나의 요소만 렌더링

2. **명시적 컴포넌트 정체성**: `key` prop 활용
   - `key`가 변경되면 React는 완전히 새로운 컴포넌트로 인식
   - Tab 컴포넌트가 DOM 구조 변화를 올바르게 감지

3. **React 재조정 알고리즘 제어**
   - `key` 없이는: React가 같은 위치의 `<div>`를 재사용 → 내부 내용만 교체
   - `key` 있으면: React가 이전 `<div>`를 제거하고 새로운 `<div>` 생성

**결과:**
- Tab 활성 상태 표시가 올바른 너비로 표시됨
- 반응형 레이아웃 정상 동작, 탭 전환 시 부드러운 UI 전환

**참고 자료:**
- [React 공식 문서 - Preserving and Resetting State](https://ko.react.dev/learn/preserving-and-resetting-state)
- 핵심 개념: React는 컴포넌트의 위치를 기준으로 상태를 추적하며, `key`를 통해 이를 명시적으로 제어할 수 있다


## 접근성 (Accessibility)

웹 접근성 표준을 준수하여 모든 사용자가 편리하게 사용할 수 있도록 구현했습니다.

### 1. ARIA 속성
- `aria-modal`: 모달 대화상자 식별
- `aria-labelledby`: 레이블 연결
- `aria-describedby`: 설명 텍스트 연결
- `aria-live`: 동적 콘텐츠 변경 알림
- `aria-pressed`: 토글 버튼 상태 표시

```typescript
<div
  role="alert"
  aria-live="assertive"
  aria-labelledby="error-title"
  aria-describedby="error-message"
>
  <div id="error-title">
    <Text>문제가 발생했습니다</Text>
  </div>
  <div id="error-message">
    <Text>{error.message}</Text>
  </div>
  <Button aria-label="오류 복구를 위해 다시 시도">다시 시도</Button>
</div>
```

### 2. 키보드 네비게이션
- `tabIndex`: 포커스 가능한 요소 지정
- `onKeyDown`: Enter/Space 키로 상품 선택 가능

```typescript
<div
  role="button"
  tabIndex={0}
  aria-pressed={isSelected}
  onKeyDown={e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProductId(isSelected ? null : product.id);
    }
  }}
>
```

### 3. 애니메이션 접근성
`prefers-reduced-motion` 미디어 쿼리를 지원하여 움직임에 민감한 사용자를 배려합니다.

```typescript
css`
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
  }
`
```

### 4. 시맨틱 HTML
- `role="list"`, `role="listitem"`: 목록 구조 명시
- `role="tablist"`, `role="tabpanel"`: 탭 인터페이스 명시
- `role="status"`: 상태 메시지 표시

## 에러 처리 전략

### QueryErrorResetBoundary의 필요성

React Query는 에러 상태를 캐싱하기 때문에, 단순히 `ErrorBoundary`로 컴포넌트를 리렌더링하는 것만으로는 에러를 복구할 수 없습니다. 이 문제를 해결하기 위해 `QueryErrorResetBoundary`를 함께 사용합니다.

```typescript
// QueryErrorResetBoundary로 감싸서 에러 상태 초기화
<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary onReset={reset} fallback={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <SavingsCalculatorPage />
      </Suspense>
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
```

**동작 원리:**
1. 사용자가 "다시 시도" 버튼 클릭
2. `ErrorBoundary`의 `onReset` 콜백 실행
3. `QueryErrorResetBoundary`의 `reset` 함수가 하위 모든 쿼리의 에러 상태 초기화
4. `ErrorBoundary`가 `setState`로 에러 상태 초기화
5. 컴포넌트 리렌더링 → 정상적으로 데이터 로드

**참고 자료:**
- [TkDodo's Blog - React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling)
- [React Query 공식 문서 - QueryErrorResetBoundary](https://tanstack.com/query/latest/docs/framework/react/reference/QueryErrorResetBoundary)

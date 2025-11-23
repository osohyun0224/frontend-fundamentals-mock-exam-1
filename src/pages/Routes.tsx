import { ErrorBoundary, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ErrorFallback } from '@/components/ErrorFallback';
import { LoadingFallback } from '@/components/LoadingFallback';
import { SavingsCalculatorPage } from './SavingsCalculatorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallback={ErrorFallback}>
            <Suspense fallback={<LoadingFallback />}>
              <SavingsCalculatorPage />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

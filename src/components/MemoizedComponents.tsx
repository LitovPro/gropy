import React from 'react'

// Higher-order component for memoization with custom comparison
export function withMemo<T extends object>(
  Component: React.ComponentType<T>,
  areEqual?: (prevProps: T, nextProps: T) => boolean
) {
  return React.memo(Component, areEqual)
}

// Custom hook for stable callback references
export function useStableCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T {
  return React.useCallback(callback, deps)
}

// Custom hook for stable value references
export function useStableValue<T>(value: T, deps: React.DependencyList): T {
  return React.useMemo(() => value, deps)
}

// Performance monitoring hook
export function usePerformanceMonitor(_componentName: string) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      return () => {
        const end = performance.now()
        // Performance monitoring in development
        // console.log(`${_componentName} render time: ${end - start}ms`)
        void start // Suppress unused variable warning
        void end // Suppress unused variable warning
      }
    }
  }, [_componentName])
}

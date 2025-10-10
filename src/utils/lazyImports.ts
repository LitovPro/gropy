import { lazy } from 'react'

// Lazy load heavy components with preloading
export const lazyWithPreload = <T extends React.ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>,
  preloadDelay = 2000
) => {
  const LazyComponent = lazy(importFunc)
  
  // Preload component after delay
  setTimeout(() => {
    importFunc().catch(() => {
      // Ignore preload errors
    })
  }, preloadDelay)
  
  return LazyComponent
}

// Preload components on user interaction
export const preloadOnHover = (importFunc: () => Promise<unknown>) => {
  let hasPreloaded = false
  
  return {
    onMouseEnter: () => {
      if (!hasPreloaded) {
        hasPreloaded = true
        importFunc().catch(() => {
          // Ignore preload errors
        })
      }
    }
  }
}

// Preload components on focus
export const preloadOnFocus = (importFunc: () => Promise<unknown>) => {
  let hasPreloaded = false
  
  return {
    onFocus: () => {
      if (!hasPreloaded) {
        hasPreloaded = true
        importFunc().catch(() => {
          // Ignore preload errors
        })
      }
    }
  }
}

// Bundle analyzer helper (development only)
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin: _BundleAnalyzerPlugin }) => {
      // Bundle analyzer available. Use webpack-bundle-analyzer in build process.
    }).catch(() => {
      // Bundle analyzer not available
    })
  }
}

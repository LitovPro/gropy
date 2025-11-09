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
    // Bundle analyzer would be available if installed as dev dependency
    // Use: npm install --save-dev webpack-bundle-analyzer
    console.log('Bundle analyzer not available. Install webpack-bundle-analyzer for bundle analysis.')
  }
}

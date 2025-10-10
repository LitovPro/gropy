// Enhanced error handling utilities

export interface AppError {
  code: string
  message: string
  details?: unknown
  timestamp: number
  component?: string
}

export class AppErrorHandler {
  private static instance: AppErrorHandler
  private errors: AppError[] = []
  private maxErrors = 50

  static getInstance(): AppErrorHandler {
    if (!AppErrorHandler.instance) {
      AppErrorHandler.instance = new AppErrorHandler()
    }
    return AppErrorHandler.instance
  }

  logError(error: Error, component?: string, details?: unknown): void {
    const appError: AppError = {
      code: error.name || 'UnknownError',
      message: error.message,
      details,
      timestamp: Date.now(),
      component
    }

    this.errors.unshift(appError)
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${component || 'App'}] Error:`, appError)
    }

    // In production, you might want to send to error tracking service
    // this.sendToErrorService(appError)
  }

  getErrors(): AppError[] {
    return [...this.errors]
  }

  clearErrors(): void {
    this.errors = []
  }

  getErrorCount(): number {
    return this.errors.length
  }

  // Get errors for specific component
  getComponentErrors(component: string): AppError[] {
    return this.errors.filter(error => error.component === component)
  }

  // Check if there are recent errors (within last 5 minutes)
  hasRecentErrors(minutes = 5): boolean {
    const cutoff = Date.now() - (minutes * 60 * 1000)
    return this.errors.some(error => error.timestamp > cutoff)
  }
}

// Global error handler instance
export const errorHandler = AppErrorHandler.getInstance()

// React error boundary helper
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
) {
  const ErrorBoundaryComponent = class extends React.Component<P, { hasError: boolean; error?: Error }> {
    constructor(props: P) {
      super(props)
      this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      errorHandler.logError(error, Component.displayName || Component.name, errorInfo)
    }

    render() {
      if (this.state.hasError) {
        if (fallback) {
          return React.createElement(fallback, {
            error: this.state.error!,
            resetError: () => this.setState({ hasError: false, error: undefined })
          })
        }
        
        return React.createElement('div', { style: { padding: '20px', textAlign: 'center' } },
          React.createElement('h2', null, 'Что-то пошло не так'),
          React.createElement('p', null, `Произошла ошибка в компоненте ${Component.displayName || Component.name}`),
          React.createElement('button', { onClick: () => this.setState({ hasError: false, error: undefined }) }, 'Попробовать снова')
        )
      }

      return React.createElement(Component, this.props)
    }
  }
  
  ErrorBoundaryComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return ErrorBoundaryComponent
}

// Utility for safe async operations
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T,
  component?: string
): Promise<T | undefined> {
  try {
    return await operation()
  } catch (error) {
    errorHandler.logError(error as Error, component)
    return fallback
  }
}

// Utility for safe sync operations
export function safeSync<T>(
  operation: () => T,
  fallback?: T,
  component?: string
): T | undefined {
  try {
    return operation()
  } catch (error) {
    errorHandler.logError(error as Error, component)
    return fallback
  }
}

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })

      // Service Worker registered

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              if (confirm('Доступно обновление. Перезагрузить страницу?')) {
                window.location.reload()
              }
            }
          })
        }
      })

      return registration
    } catch {
      // Service Worker registration failed
    }
  }
}

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map(registration => registration.unregister()))
      // Service Worker unregistered
    } catch {
      // Service Worker unregistration failed
    }
  }
}




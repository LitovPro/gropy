# Развертывание Gropy

## Локальная разработка

```bash
# Клонирование репозитория
git clone <repository-url>
cd gropy

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## Сборка для продакшена

```bash
# Сборка проекта
npm run build

# Предварительный просмотр сборки
npm run preview
```

Собранные файлы будут в папке `dist/`.

## Развертывание на Vercel

1. Подключите репозиторий к Vercel
2. Настройки сборки:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Развертывание на Netlify

1. Подключите репозиторий к Netlify
2. Настройки сборки:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## Развертывание на GitHub Pages

```bash
# Установка gh-pages
npm install --save-dev gh-pages

# Добавление скрипта в package.json
"scripts": {
  "deploy": "gh-pages -d dist"
}

# Сборка и развертывание
npm run build
npm run deploy
```

## PWA функции

Приложение поддерживает PWA с:
- Service Worker для офлайн работы
- Манифест для установки на устройство
- Кэширование ресурсов

## Переменные окружения

Для продакшена можно настроить:
- `VITE_API_URL` - URL API (если будет добавлен)
- `VITE_ANALYTICS_ID` - ID для аналитики

## Мониторинг

Рекомендуется настроить:
- Мониторинг ошибок (Sentry)
- Аналитику использования
- Мониторинг производительности

## Безопасность

- Все пользовательские данные санитизируются через DOMPurify
- Валидация входных данных
- Безопасное хранение в localStorage






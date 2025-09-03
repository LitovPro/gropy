# 🚀 Деплой Gropy

## 📱 Telegram Web App

### Подготовка для Telegram:
1. **Создайте бота** через @BotFather
2. **Получите токен** бота
3. **Настройте Web App** командой `/setmenubutton`
4. **Укажите URL** вашего деплоя

### Команды для BotFather:
```
/newbot
Gropy Bot
gropy_helper_bot

/setmenubutton
@gropy_helper_bot
Открыть Gropy
https://ваш-домен.com
```

## 🌐 GitHub Pages

### Автоматический деплой:
1. **Включите GitHub Pages** в настройках репозитория
2. **Source:** GitHub Actions
3. **Создайте workflow** файл (см. ниже)

### Workflow файл (.github/workflows/deploy.yml):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## 🔧 Другие платформы

### Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Netlify:
```bash
npm run build
# Загрузите папку build на netlify.com
```

### Heroku:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## 📱 PWA (Progressive Web App)

### Для оффлайн работы добавьте:
1. **Service Worker** для кеширования
2. **Manifest.json** для установки на устройство
3. **Иконки** разных размеров

### Manifest.json пример:
```json
{
  "name": "Gropy - Твой добрый помощник в делах",
  "short_name": "Gropy",
  "description": "Мягкий планировщик задач для ментального здоровья",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6366f1",
  "background_color": "#fefefe",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔐 Environment Variables

### Для продакшена:
```env
REACT_APP_VERSION=1.0.0
REACT_APP_TELEGRAM_BOT_NAME=gropy_helper_bot
REACT_APP_GITHUB_URL=https://github.com/LitovPro/gropy
REACT_APP_DEMO_URL=https://litovpro.github.io/gropy
```

## 📊 Analytics (опционально)

### Для отслеживания использования:
- **Yandex Metrica** (бесплатно)
- **Google Analytics 4** 
- **Plausible** (privacy-focused)

---

**Gropy готов к запуску! 🌟**

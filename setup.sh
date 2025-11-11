#!/bin/bash

# Скрипт установки Node.js и зависимостей проекта

set -e

echo "🚀 Начинаем установку..."

# Загружаем nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Проверяем наличие nvm
if ! command -v nvm &> /dev/null; then
    echo "❌ nvm не найден. Устанавливаем..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Устанавливаем Node.js LTS
echo "📦 Устанавливаем Node.js LTS..."
nvm install --lts
nvm use --lts

# Проверяем установку
echo "✅ Проверяем установку..."
node --version
npm --version

# Устанавливаем зависимости проекта
echo "📦 Устанавливаем зависимости проекта..."
cd "$(dirname "$0")"
npm install

echo "✅ Готово! Теперь можно запустить проект: npm run dev"


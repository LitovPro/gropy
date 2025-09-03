/**
 * Утилиты безопасности для Gropy
 */
import DOMPurify from 'dompurify';

// Безопасная санитизация текста от XSS
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') return '';
  
  // Используем DOMPurify для максимальной защиты
  const cleaned = DOMPurify.sanitize(text, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
  
  return cleaned.trim().slice(0, 200); // Ограничиваем длину
};

// Валидация задачи
export const validateTodoText = (text: string): { isValid: boolean; error?: string } => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'Задача не может быть пустой' };
  }
  
  if (text.length > 200) {
    return { isValid: false, error: 'Задача слишком длинная (макс. 200 символов)' };
  }
  
  // Проверка на подозрительные паттерны
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(text)) {
      return { isValid: false, error: 'Недопустимые символы в тексте задачи' };
    }
  }
  
  return { isValid: true };
};

// Безопасная работа с localStorage
export const safeLocalStorage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Ошибка чтения из localStorage для ключа ${key}:`, error);
      return null;
    }
  },
  
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Ошибка записи в localStorage для ключа ${key}:`, error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Ошибка удаления из localStorage для ключа ${key}:`, error);
      return false;
    }
  }
};

// Генерация безопасного ID
export const generateSecureId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

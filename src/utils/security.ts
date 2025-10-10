import DOMPurify from 'dompurify'

export const sanitizeText = (text: string): string => {
  // Basic validation
  if (typeof text !== 'string') return ''
  if (text.length > 200) return text.slice(0, 200)
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script/i,
    /on\w+\s*=/i,
    /javascript:/i,
    /data:/i,
  ]
  
  if (dangerousPatterns.some(pattern => pattern.test(text))) {
    return ''
  }
  
  // Sanitize with DOMPurify
  return DOMPurify.sanitize(text, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  })
}

export const validateTodoText = (text: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeText(text)
  
  if (!sanitized.trim()) {
    return { isValid: false, error: 'Текст не может быть пустым' }
  }
  
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Минимум 2 символа' }
  }
  
  if (sanitized.length > 200) {
    return { isValid: false, error: 'Максимум 200 символов' }
  }
  
  return { isValid: true }
}






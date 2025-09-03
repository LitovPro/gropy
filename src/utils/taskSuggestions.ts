/**
 * Система предложений задач для Gropy
 */

export interface TaskSuggestion {
  id: string;
  text: string;
  category: 'daily' | 'work' | 'personal' | 'health' | 'learning' | 'selfcare';
  energy: 'low' | 'medium' | 'high';
  emoji: string;
  motivationalText?: string;
}

// Ежедневные предложения по категориям
const taskSuggestions = {
  daily: [
    { text: 'Выпить стакан воды', energy: 'low', emoji: '💧', motivationalText: 'Увлажнение - основа хорошего дня!' },
    { text: 'Сделать кровать', energy: 'low', emoji: '🛏️', motivationalText: 'Маленький порядок = большое спокойствие' },
    { text: 'Почистить зубы', energy: 'low', emoji: '🦷', motivationalText: 'Улыбка делает день ярче!' },
    { text: 'Проветрить комнату', energy: 'low', emoji: '🌬️', motivationalText: 'Свежий воздух - свежие мысли' },
    { text: 'Принять душ', energy: 'medium', emoji: '🚿', motivationalText: 'Смыть усталость и набраться сил' },
    { text: 'Привести в порядок рабочее место', energy: 'medium', emoji: '📋', motivationalText: 'Порядок вокруг = порядок в голове' },
  ],
  
  selfcare: [
    { text: 'Помедитировать 5 минут', energy: 'low', emoji: '🧘', motivationalText: 'Тишина внутри - сила снаружи' },
    { text: 'Послушать любимую музыку', energy: 'low', emoji: '🎵', motivationalText: 'Музыка лечит душу' },
    { text: 'Обнять домашнего питомца', energy: 'low', emoji: '🐱', motivationalText: 'Любовь и тепло рядом' },
    { text: 'Сделать себе вкусный чай', energy: 'low', emoji: '🍵', motivationalText: 'Маленькие удовольствия важны' },
    { text: 'Написать 3 вещи, за которые благодарен', energy: 'medium', emoji: '📝', motivationalText: 'Благодарность умножает счастье' },
    { text: 'Принять расслабляющую ванну', energy: 'medium', emoji: '🛁', motivationalText: 'Время для себя бесценно' },
    { text: 'Посмотреть на звёзды', energy: 'medium', emoji: '⭐', motivationalText: 'Вселенная напоминает о красоте' },
    { text: 'Сделать маску для лица', energy: 'medium', emoji: '🧴', motivationalText: 'Забота о себе - не роскошь' },
  ],
  
  health: [
    { text: 'Сделать 10 приседаний', energy: 'medium', emoji: '💪', motivationalText: 'Каждое движение - победа!' },
    { text: 'Потянуться 5 минут', energy: 'low', emoji: '🤸', motivationalText: 'Гибкость тела = гибкость ума' },
    { text: 'Прогуляться 15 минут', energy: 'medium', emoji: '🚶', motivationalText: 'Шаги к здоровью и счастью' },
    { text: 'Съесть фрукт', energy: 'low', emoji: '🍎', motivationalText: 'Витамины для хорошего настроения' },
    { text: 'Сделать дыхательную гимнастику', energy: 'low', emoji: '🫁', motivationalText: 'Дыхание - источник энергии' },
    { text: 'Поплавать или принять контрастный душ', energy: 'high', emoji: '🏊', motivationalText: 'Вода дарит бодрость' },
  ],
  
  personal: [
    { text: 'Позвонить близкому человеку', energy: 'medium', emoji: '📞', motivationalText: 'Связь с любимыми согревает сердце' },
    { text: 'Посмотреть старые фото', energy: 'low', emoji: '📸', motivationalText: 'Воспоминания - сокровище души' },
    { text: 'Написать письмо будущему себе', energy: 'medium', emoji: '💌', motivationalText: 'Мечты становятся реальностью' },
    { text: 'Приготовить что-то вкусное', energy: 'high', emoji: '👨‍🍳', motivationalText: 'Творчество на кухне приносит радость' },
    { text: 'Посадить растение или полить цветы', energy: 'medium', emoji: '🌱', motivationalText: 'Забота о живом лечит душу' },
    { text: 'Навести порядок в одном ящике', energy: 'medium', emoji: '📦', motivationalText: 'Маленькие шаги к большому порядку' },
  ],
  
  learning: [
    { text: 'Прочитать одну статью', energy: 'medium', emoji: '📰', motivationalText: 'Знания - лучшая инвестиция' },
    { text: 'Посмотреть обучающее видео', energy: 'low', emoji: '📺', motivationalText: 'Каждый день можно узнать что-то новое' },
    { text: 'Изучить одно новое слово', energy: 'low', emoji: '📚', motivationalText: 'Словарный запас - богатство ума' },
    { text: 'Послушать подкаст', energy: 'low', emoji: '🎧', motivationalText: 'Мудрость приходит через уши' },
    { text: 'Написать заметку о новом', energy: 'medium', emoji: '✍️', motivationalText: 'Записанное лучше запоминается' },
  ],
  
  work: [
    { text: 'Разобрать email', energy: 'medium', emoji: '📧', motivationalText: 'Чистый inbox = чистый разум' },
    { text: 'Сделать план на завтра', energy: 'medium', emoji: '📋', motivationalText: 'Планирование - ключ к успеху' },
    { text: 'Организовать рабочий стол', energy: 'medium', emoji: '🗂️', motivationalText: 'Порядок повышает продуктивность' },
    { text: 'Сделать перерыв на чай', energy: 'low', emoji: '☕', motivationalText: 'Отдых - часть работы' },
    { text: 'Поблагодарить коллегу', energy: 'low', emoji: '🤝', motivationalText: 'Доброта создаёт хорошую атмосферу' },
  ]
};

// Мотивационные фразы для начала дня
const morningMotivation = [
  'Сегодня отличный день для маленьких побед! ✨',
  'Каждый шаг важен, даже самый маленький 🌸',
  'Ты справишься, я в тебя верю! 💖',
  'Сегодня день для заботы о себе 🌺',
  'Маленькие дела приносят большое удовлетворение 🌟',
  'Твоё благополучие - самое важное 💚',
  'Не торопись, делай в своём темпе 🦋',
  'Каждое выполненное дело - повод для гордости! 🎉'
];

// Вечерние позитивные сообщения
const eveningReflection = [
  'Ты молодец, что заботишься о себе! 🌙',
  'Каждый день ты становишься лучше ✨',
  'Отдохни, ты это заслужил 😴',
  'Завтра новый день, полный возможностей 🌅',
  'Гордись собой за сегодняшние достижения 🏆',
  'Твой прогресс вдохновляет! 💫',
  'Спокойной ночи, завтра будет прекрасный день 🌟'
];

// Функция получения предложений на день
export const getDailySuggestions = (date: Date = new Date()): TaskSuggestion[] => {
  const dayOfWeek = date.getDay(); // 0 = воскресенье, 6 = суббота
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const suggestions: TaskSuggestion[] = [];
  
  // Всегда добавляем ежедневные задачи
  const dailyTasks = getRandomTasks(taskSuggestions.daily, 2);
  suggestions.push(...dailyTasks.map(task => ({ ...task, category: 'daily' as const })));
  
  // Всегда добавляем заботу о себе
  const selfcareTasks = getRandomTasks(taskSuggestions.selfcare, 2);
  suggestions.push(...selfcareTasks.map(task => ({ ...task, category: 'selfcare' as const })));
  
  // В выходные больше личных и здоровых задач
  if (isWeekend) {
    const personalTasks = getRandomTasks(taskSuggestions.personal, 2);
    const healthTasks = getRandomTasks(taskSuggestions.health, 1);
    suggestions.push(...personalTasks.map(task => ({ ...task, category: 'personal' as const })));
    suggestions.push(...healthTasks.map(task => ({ ...task, category: 'health' as const })));
  } else {
    // В будни добавляем рабочие и обучающие
    const workTasks = getRandomTasks(taskSuggestions.work, 1);
    const learningTasks = getRandomTasks(taskSuggestions.learning, 1);
    const healthTasks = getRandomTasks(taskSuggestions.health, 1);
    suggestions.push(...workTasks.map(task => ({ ...task, category: 'work' as const })));
    suggestions.push(...learningTasks.map(task => ({ ...task, category: 'learning' as const })));
    suggestions.push(...healthTasks.map(task => ({ ...task, category: 'health' as const })));
  }
  
  // Добавляем уникальные ID
  return suggestions.map((task, index) => ({
    ...task,
    id: `suggestion-${date.toDateString()}-${index}`
  }));
};

// Функция получения случайных задач из категории
function getRandomTasks<T>(tasks: T[], count: number): T[] {
  const shuffled = [...tasks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Получить мотивационное сообщение
export const getMotivationalMessage = (timeOfDay: 'morning' | 'evening' = 'morning'): string => {
  const messages = timeOfDay === 'morning' ? morningMotivation : eveningReflection;
  return messages[Math.floor(Math.random() * messages.length)];
};

// Проверить, нужно ли показать предложения (раз в день)
export const shouldShowSuggestions = (): boolean => {
  const lastShown = localStorage.getItem('gropy-last-suggestions');
  const today = new Date().toDateString();
  return lastShown !== today;
};

// Отметить, что предложения показаны
export const markSuggestionsShown = (): void => {
  const today = new Date().toDateString();
  localStorage.setItem('gropy-last-suggestions', today);
};

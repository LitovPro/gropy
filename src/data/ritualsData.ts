import { Ritual, GuidedStep, BreathingMode } from '../types/rituals'

// Calming Breathing (4-4-6-2) - наша текущая техника для успокоения
export const CALMING_BREATHING_STEPS: GuidedStep[] = [
  {
    id: 'inhale',
    title: 'Вдох',
    description: 'Медленно вдохни через нос (4 сек)',
    duration: 4,
    instruction: 'Почувствуй, как воздух наполняет живот'
  },
  {
    id: 'hold_in',
    title: 'Задержка',
    description: 'Задержи дыхание (4 сек)',
    duration: 4,
    instruction: 'Оставайся спокойным и расслабленным'
  },
  {
    id: 'exhale',
    title: 'Выдох',
    description: 'Медленно выдохни через рот (6 сек)',
    duration: 6,
    instruction: 'Отпусти всё напряжение и стресс'
  },
  {
    id: 'hold_out',
    title: 'Пауза',
    description: 'Короткая пауза (2 сек)',
    duration: 2,
    instruction: 'Наслаждайся покоем'
  }
]

// Box Breathing (4-4-4-4) - используется военными и спецслужбами
export const BOX_BREATHING_STEPS: GuidedStep[] = [
  {
    id: 'inhale',
    title: 'Вдох',
    description: 'Медленно вдохни через нос (4 сек)',
    duration: 4,
    instruction: 'Почувствуй, как воздух наполняет живот'
  },
  {
    id: 'hold_in',
    title: 'Задержка',
    description: 'Задержи дыхание (4 сек)',
    duration: 4,
    instruction: 'Оставайся спокойным и расслабленным'
  },
  {
    id: 'exhale',
    title: 'Выдох',
    description: 'Медленно выдохни через рот (4 сек)',
    duration: 4,
    instruction: 'Отпусти всё напряжение и стресс'
  },
  {
    id: 'hold_out',
    title: 'Пауза',
    description: 'Короткая пауза (4 сек)',
    duration: 4,
    instruction: 'Наслаждайся покоем'
  }
]

// Coherent Breathing (5-5) - для баланса нервной системы
export const COHERENT_BREATHING_STEPS: GuidedStep[] = [
  {
    id: 'inhale',
    title: 'Вдох',
    description: 'Медленно вдохни через нос (5 сек)',
    duration: 5,
    instruction: 'Почувствуй, как воздух наполняет живот'
  },
  {
    id: 'exhale',
    title: 'Выдох',
    description: 'Медленно выдохни через рот (5 сек)',
    duration: 5,
    instruction: 'Отпусти всё напряжение и стресс'
  }
]

// Triangle Breathing (4-4-4) - для фокуса и концентрации
export const TRIANGLE_BREATHING_STEPS: GuidedStep[] = [
  {
    id: 'inhale',
    title: 'Вдох',
    description: 'Медленно вдохни через нос (4 сек)',
    duration: 4,
    instruction: 'Почувствуй, как воздух наполняет живот'
  },
  {
    id: 'hold_in',
    title: 'Задержка',
    description: 'Задержи дыхание (4 сек)',
    duration: 4,
    instruction: 'Оставайся спокойным и расслабленным'
  },
  {
    id: 'exhale',
    title: 'Выдох',
    description: 'Медленно выдохни через рот (4 сек)',
    duration: 4,
    instruction: 'Отпусти всё напряжение и стресс'
  }
]

export const STRETCH_STEPS: GuidedStep[] = [
  {
    id: 'neck',
    title: 'Шея',
    description: 'Медленно поворачивай голову влево и вправо',
    duration: 0, // No timer, user-controlled
    instruction: 'Дыши глубоко и расслабляйся'
  },
  {
    id: 'shoulders',
    title: 'Плечи',
    description: 'Поднимай и опускай плечи',
    duration: 0, // No timer, user-controlled
    instruction: 'Снимай напряжение с плеч'
  }
]

// Функция для получения шагов дыхания в зависимости от режима
export const getBreathingSteps = (mode: BreathingMode): GuidedStep[] => {
  switch (mode) {
    case 'calming':
      return CALMING_BREATHING_STEPS
    case 'box':
      return BOX_BREATHING_STEPS
    case 'coherent':
      return COHERENT_BREATHING_STEPS
    case 'triangle':
      return TRIANGLE_BREATHING_STEPS
    default:
      return CALMING_BREATHING_STEPS
  }
}

// Функция для получения фаз дыхания в зависимости от режима
export const getBreathingPhases = (mode: BreathingMode): ('inhale' | 'hold' | 'exhale' | 'pause')[] => {
  switch (mode) {
    case 'calming':
      return ['inhale', 'hold', 'exhale', 'pause'] // 4-4-6-2
    case 'box':
      return ['inhale', 'hold', 'exhale', 'pause'] // 4-4-4-4
    case 'coherent':
      return ['inhale', 'exhale'] // 5-5 (только вдох и выдох)
    case 'triangle':
      return ['inhale', 'hold', 'exhale'] // 4-4-4 (без паузы)
    default:
      return ['inhale', 'hold', 'exhale', 'pause']
  }
}

// Информация о режимах дыхания
export const BREATHING_MODES = {
  calming: {
    name: 'Успокоение',
    description: '4-4-6-2',
    cycles: 5,
    totalTime: 80 // 5 cycles × 16 seconds
  },
  box: {
    name: 'Квадрат',
    description: '4-4-4-4',
    cycles: 5,
    totalTime: 80 // 5 cycles × 16 seconds
  },
  coherent: {
    name: 'Баланс',
    description: '5-5',
    cycles: 6,
    totalTime: 60 // 6 cycles × 10 seconds
  },
  triangle: {
    name: 'Треугольник',
    description: '4-4-4',
    cycles: 5,
    totalTime: 60 // 5 cycles × 12 seconds
  }
}

export const RITUALS: Ritual[] = [
  {
    id: 'breath',
    title: 'Дыхание',
    description: 'Научно обоснованные техники дыхания',
    icon: '🌬️',
    category: 'breath',
    type: 'repeatable', // Can do multiple times per day
    defaultDuration: 0, // No timer, cycle-based
    guidedSteps: CALMING_BREATHING_STEPS, // Default to Calming Breathing
    quickDescription: 'Быстрое дыхательное упражнение',
    reflectionPrompt: 'Стало ли спокойнее?',
    reflectionOptions: ['😊', '😐', '😣']
  },
  {
    id: 'water',
    title: 'Попить воды',
    description: '1 стакан воды',
    icon: '💧',
    category: 'body',
    type: 'daily', // Once per day
    defaultDuration: 0, // No timer, gesture-based
    quickDescription: 'Один жест = выпил',
    reflectionPrompt: 'Сколько выпил?',
    reflectionOptions: ['200мл', '300мл', '500мл']
  },
  {
    id: 'stretch',
    title: 'Потянуться',
    description: 'Лёгкая растяжка',
    icon: '🤸',
    category: 'body',
    type: 'daily', // Once per day
    defaultDuration: 0, // No timer, user-controlled
    guidedSteps: STRETCH_STEPS,
    quickDescription: 'Выполни растяжку в своём темпе',
    reflectionPrompt: 'Где стало легче?',
    reflectionOptions: ['шея', 'плечи', 'спина']
  },
  {
    id: 'gratitude',
    title: 'Благодарность',
    description: '1 вещь за которую благодарен',
    icon: '🙏',
    category: 'mind',
    type: 'daily', // Once per day
    defaultDuration: 0, // Text input based
    quickDescription: 'Записать одну благодарность',
    reflectionPrompt: 'Настроение до/после',
    reflectionOptions: ['😊', '😐', '😣', '😌', '😊']
  },
  {
    id: 'walk',
    title: 'Прогулка',
    description: 'Прогулка на свежем воздухе',
    icon: '🚶',
    category: 'movement',
    type: 'daily', // Once per day
    defaultDuration: 0, // No timer, user-controlled
    quickDescription: 'Иди в своём темпе',
    reflectionPrompt: 'Заметил ли что-то приятное?',
    reflectionOptions: ['природа', 'люди', 'тишина', 'свет']
  },
  // Home care rituals
  {
    id: 'ventilate',
    title: 'Проветрить комнату',
    description: 'Открыть окно на 5 минут для свежего воздуха',
    icon: '🪟',
    category: 'home',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Открой окно на 5 минут',
    reflectionPrompt: 'Как ощущается воздух?',
    reflectionOptions: ['свежо', 'прохладно', 'приятно']
  },
  {
    id: 'tidy',
    title: 'Убрать рабочее место',
    description: 'Навести порядок на столе/в пространстве',
    icon: '🧹',
    category: 'home',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Наведи порядок вокруг',
    reflectionPrompt: 'Стало ли спокойнее?',
    reflectionOptions: ['да', 'немного', 'пока нет']
  },
  {
    id: 'water-plants',
    title: 'Полить растения',
    description: 'Забота о комнатных растениях',
    icon: '🌱',
    category: 'home',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Позаботься о растениях',
    reflectionPrompt: 'Как себя чувствуют растения?',
    reflectionOptions: ['хорошо', 'нуждаются в воде', 'растут']
  },
  // Body care rituals
  {
    id: 'wash-face',
    title: 'Умыться холодной водой',
    description: 'Освежиться и взбодриться',
    icon: '💧',
    category: 'body',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Освежись холодной водой',
    reflectionPrompt: 'Как ощущения?',
    reflectionOptions: ['бодро', 'свежо', 'приятно']
  },
  {
    id: 'brush-teeth',
    title: 'Почистить зубы медленно',
    description: 'Осознанная гигиена',
    icon: '🦷',
    category: 'body',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Медленно и осознанно',
    reflectionPrompt: 'Как ощущается чистка?',
    reflectionOptions: ['приятно', 'обычно', 'расслабляюще']
  },
  {
    id: 'massage-temples',
    title: 'Сделать массаж висков',
    description: 'Снять напряжение',
    icon: '🤲',
    category: 'body',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Помассируй виски',
    reflectionPrompt: 'Стало ли легче?',
    reflectionOptions: ['да', 'немного', 'пока нет']
  },
  {
    id: 'massage-shoulders',
    title: 'Помассировать плечи',
    description: 'Снять мышечное напряжение',
    icon: '💆',
    category: 'body',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Сними напряжение с плеч',
    reflectionPrompt: 'Как ощущаются плечи?',
    reflectionOptions: ['расслаблены', 'легче', 'всё ещё напряжены']
  },
  // Visual rituals
  {
    id: 'look-window',
    title: 'Посмотреть в окно',
    description: 'Дать глазам отдохнуть от экрана',
    icon: '👁️',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Дай глазам отдохнуть',
    reflectionPrompt: 'Что видишь?',
    reflectionOptions: ['природу', 'здания', 'небо', 'людей']
  },
  {
    id: 'find-beauty',
    title: 'Найти 3 красивых предмета',
    description: 'Практика благодарности за красоту',
    icon: '✨',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Найди красоту вокруг',
    reflectionPrompt: 'Что тебя порадовало?',
    reflectionOptions: ['цвета', 'формы', 'свет', 'текстуры']
  },
  {
    id: 'close-eyes',
    title: 'Закрыть глаза на минуту',
    description: 'Дать зрению отдохнуть',
    icon: '😌',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Минута отдыха для глаз',
    reflectionPrompt: 'Как ощущения?',
    reflectionOptions: ['расслабленно', 'спокойно', 'отдохнул']
  },
  {
    id: 'look-sky',
    title: 'Посмотреть на небо',
    description: 'Расширить перспективу',
    icon: '☁️',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Подними глаза к небу',
    reflectionPrompt: 'Что видишь в небе?',
    reflectionOptions: ['облака', 'солнце', 'звёзды', 'чистое небо']
  },
  // Audio rituals
  {
    id: 'listen-silence',
    title: 'Послушать тишину',
    description: '2-3 минуты без звуков',
    icon: '🔇',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Побыть в тишине',
    reflectionPrompt: 'Что слышишь в тишине?',
    reflectionOptions: ['дыхание', 'сердцебиение', 'тишину', 'далёкие звуки']
  },
  {
    id: 'hear-sounds',
    title: 'Услышать 5 звуков',
    description: 'Практика осознанности слуха',
    icon: '👂',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Обрати внимание на звуки',
    reflectionPrompt: 'Какие звуки услышал?',
    reflectionOptions: ['природные', 'городские', 'человеческие', 'механические']
  },
  {
    id: 'play-music',
    title: 'Включить любимую песню',
    description: 'Музыкальная терапия',
    icon: '🎵',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Насладись музыкой',
    reflectionPrompt: 'Как влияет музыка?',
    reflectionOptions: ['поднимает настроение', 'успокаивает', 'вдохновляет', 'расслабляет']
  },
  // Touch rituals
  {
    id: 'touch-soft',
    title: 'Потрогать что-то мягкое',
    description: 'Сенсорная терапия',
    icon: '🤗',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Почувствуй мягкость',
    reflectionPrompt: 'Что потрогал?',
    reflectionOptions: ['одежду', 'подушку', 'животное', 'ткань']
  },
  {
    id: 'hug-self',
    title: 'Обнять себя',
    description: 'Самоподдержка через прикосновение',
    icon: '🤗',
    category: 'sensory',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Обними себя',
    reflectionPrompt: 'Как ощущения?',
    reflectionOptions: ['уютно', 'поддерживающе', 'приятно', 'необычно']
  },
  // Digital rituals
  {
    id: 'close-tabs',
    title: 'Закрыть все вкладки',
    description: 'Очистка цифрового пространства',
    icon: '🗂️',
    category: 'digital',
    type: 'daily', // Once per day
    defaultDuration: 0,
    quickDescription: 'Очисти цифровое пространство',
    reflectionPrompt: 'Как ощущается порядок?',
    reflectionOptions: ['легче', 'организованно', 'спокойно', 'свободно']
  }
]

export const KINDNESS_IDEAS = [
  'Улыбнись незнакомцу',
  'Поблагодари кого-то',
  'Сделай комплимент',
  'Помоги с мелочью',
  'Напиши доброе сообщение',
  'Поделись чем-то вкусным',
  'Выслушай внимательно',
  'Скажи "спасибо"',
  'Помоги донести сумки',
  'Подари улыбку'
]

export const GRATITUDE_SUGGESTIONS = [
  'тёплый чай',
  'тихий момент',
  'поддержка друга',
  'хорошая погода',
  'здоровье',
  'дом',
  'семья',
  'работа',
  'природа',
  'музыка',
  'книга',
  'сон',
  'еда',
  'смех',
  'мир'
]

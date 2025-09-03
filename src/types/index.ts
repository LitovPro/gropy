/**
 * Типы для Gropy
 */

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  points: number;
  category: 'daily' | 'work' | 'personal' | 'health' | 'learning' | 'selfcare';
  energy: 'low' | 'medium' | 'high'; // Вместо приоритета - уровень энергии
  createdAt: string;
  completedAt?: string;
  mood?: 'great' | 'good' | 'okay' | 'tired'; // Настроение при выполнении
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: 'theme' | 'petItem' | 'decoration';
  description?: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface PetItem {
  id: string;
  name: string;
  emoji: string;
  type: 'accessory' | 'toy' | 'food' | 'decoration';
  purchasedAt: string;
}

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  totalPoints: number;
  streak: number;
  level: number;
  experience: number;
}

export interface GameState {
  points: number;
  level: number;
  experience: number;
  streak: number;
  lastActivityDate: string;
  achievements: string[];
}

export type ThemeName = 'light' | 'dark' | 'ocean' | 'forest';

export interface NotificationConfig {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
}

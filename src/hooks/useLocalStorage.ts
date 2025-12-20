import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export interface HealthProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | '';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | '';
  smokingStatus: 'never' | 'former' | 'current' | '';
  alcoholConsumption: 'none' | 'occasional' | 'moderate' | 'heavy' | '';
  existingConditions: string[];
  allergies: string[];
  isProfileComplete: boolean;
}

export const defaultHealthProfile: HealthProfile = {
  name: '',
  age: 0,
  gender: '',
  height: 0,
  weight: 0,
  activityLevel: '',
  smokingStatus: '',
  alcoholConsumption: '',
  existingConditions: [],
  allergies: [],
  isProfileComplete: false,
};

export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  bodyParts: string[];
  description: string;
  results: string[];
}

export interface DailyGoal {
  id: string;
  type: 'water' | 'steps' | 'sleep' | 'medication' | 'exercise' | 'breathing';
  target: number;
  current: number;
  unit: string;
  label: string;
}

export interface GoalProgress {
  date: string;
  goals: DailyGoal[];
  streak: number;
}

export function useHealthProfile() {
  return useLocalStorage<HealthProfile>('healix-profile', defaultHealthProfile);
}

export function useSymptomHistory() {
  return useLocalStorage<SymptomEntry[]>('healix-symptom-history', []);
}

export function useDailyGoals() {
  const today = new Date().toISOString().split('T')[0];
  const defaultGoals: GoalProgress = {
    date: today,
    goals: [
      { id: 'water', type: 'water', target: 8, current: 0, unit: 'glasses', label: 'Water Intake' },
      { id: 'steps', type: 'steps', target: 10000, current: 0, unit: 'steps', label: 'Walking Steps' },
      { id: 'sleep', type: 'sleep', target: 8, current: 0, unit: 'hours', label: 'Sleep' },
      { id: 'exercise', type: 'exercise', target: 30, current: 0, unit: 'minutes', label: 'Exercise' },
      { id: 'breathing', type: 'breathing', target: 5, current: 0, unit: 'minutes', label: 'Breathing' },
    ],
    streak: 0,
  };
  
  return useLocalStorage<GoalProgress>('healix-daily-goals', defaultGoals);
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('healix-theme', 'light');
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return { theme, setTheme, toggleTheme };
}

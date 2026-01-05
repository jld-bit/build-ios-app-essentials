
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'essential' | 'non-essential';
  date: string;
}

interface BudgetData {
  monthlyIncome: number | null;
  totalSavings: number | null;
  expenses: Expense[];
  survivalMode: boolean;
  currency: string;
}

interface BudgetContextType {
  monthlyIncome: number | null;
  totalSavings: number | null;
  expenses: Expense[];
  survivalMode: boolean;
  currency: string;
  setMonthlyIncome: (amount: number | null) => void;
  setTotalSavings: (amount: number | null) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  deleteExpense: (id: string) => void;
  toggleSurvivalMode: () => void;
  setCurrency: (currency: string) => void;
  resetData: () => void;
  loading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const STORAGE_KEY = '@budget_data';

// Generate a more unique ID
let idCounter = 0;
function generateUniqueId(): string {
  idCounter++;
  return `${Date.now()}-${idCounter}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BudgetData>({
    monthlyIncome: null,
    totalSavings: null,
    expenses: [],
    survivalMode: false,
    currency: '$',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveData();
    }
  }, [data, loading]);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setData({
          monthlyIncome: parsedData.monthlyIncome ?? null,
          totalSavings: parsedData.totalSavings ?? null,
          expenses: parsedData.expenses || [],
          survivalMode: parsedData.survivalMode || false,
          currency: parsedData.currency || '$',
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const setMonthlyIncome = (amount: number | null) => {
    setData(prev => ({ ...prev, monthlyIncome: amount }));
  };

  const setTotalSavings = (amount: number | null) => {
    setData(prev => ({ ...prev, totalSavings: amount }));
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: generateUniqueId(),
      date: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, expenses: [...prev.expenses, newExpense] }));
  };

  const deleteExpense = (id: string) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(e => e.id !== id),
    }));
  };

  const toggleSurvivalMode = () => {
    setData(prev => ({ ...prev, survivalMode: !prev.survivalMode }));
  };

  const setCurrency = (currency: string) => {
    setData(prev => ({ ...prev, currency }));
  };

  const resetData = async () => {
    const newData: BudgetData = {
      monthlyIncome: null,
      totalSavings: null,
      expenses: [],
      survivalMode: false,
      currency: '$',
    };
    setData(newData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  return (
    <BudgetContext.Provider
      value={{
        ...data,
        setMonthlyIncome,
        setTotalSavings,
        addExpense,
        deleteExpense,
        toggleSurvivalMode,
        setCurrency,
        resetData,
        loading,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

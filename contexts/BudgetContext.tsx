
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
  monthlyIncome: number;
  expenses: Expense[];
  survivalMode: boolean;
  currency: string;
}

interface BudgetContextType {
  monthlyIncome: number;
  expenses: Expense[];
  survivalMode: boolean;
  currency: string;
  setMonthlyIncome: (amount: number) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  deleteExpense: (id: string) => void;
  toggleSurvivalMode: () => void;
  setCurrency: (currency: string) => void;
  resetData: () => void;
  loading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const STORAGE_KEY = '@budget_data';

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BudgetData>({
    monthlyIncome: 0,
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
        // Remove totalSavings if it exists in old data
        const { totalSavings, ...cleanData } = parsedData;
        setData({
          monthlyIncome: cleanData.monthlyIncome || 0,
          expenses: cleanData.expenses || [],
          survivalMode: cleanData.survivalMode || false,
          currency: cleanData.currency || '$',
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

  const setMonthlyIncome = (amount: number) => {
    setData(prev => ({ ...prev, monthlyIncome: amount }));
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
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
      monthlyIncome: 0,
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

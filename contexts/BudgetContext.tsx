
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'essential' | 'non-essential';
  date: string;
}

interface BudgetData {
  monthlyIncome: number;
  totalSavings: number;
  expenses: Expense[];
  survivalMode: boolean;
  currency: string;
}

interface BudgetContextType {
  monthlyIncome: number;
  totalSavings: number;
  expenses: Expense[];
  survivalMode: boolean;
  currency: string;
  setMonthlyIncome: (amount: number) => void;
  setTotalSavings: (amount: number) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  deleteExpense: (id: string) => void;
  toggleSurvivalMode: () => void;
  setCurrency: (currency: string) => void;
  resetData: () => void;
  loading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const STORAGE_KEY = '@survival_budget_data';

const defaultData: BudgetData = {
  monthlyIncome: 0,
  totalSavings: 0,
  expenses: [],
  survivalMode: false,
  currency: '$',
};

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BudgetData>(defaultData);
  const [loading, setLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    console.log('BudgetProvider mounted, loading data...');
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      saveData();
    }
  }, [data, loading]);

  const loadData = async () => {
    try {
      console.log('Loading budget data from AsyncStorage...');
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const loadedData = JSON.parse(jsonValue);
        setData(loadedData);
        console.log('Budget data loaded successfully:', loadedData);
      } else {
        console.log('No existing budget data found, using defaults');
      }
    } catch (e) {
      console.error('Error loading budget data:', e);
    } finally {
      setLoading(false);
      console.log('Budget data loading complete');
    }
  };

  const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Budget data saved successfully');
    } catch (e) {
      console.error('Error saving budget data:', e);
    }
  };

  const setMonthlyIncome = (amount: number) => {
    console.log('Setting monthly income:', amount);
    setData(prev => ({ ...prev, monthlyIncome: amount }));
  };

  const setTotalSavings = (amount: number) => {
    console.log('Setting total savings:', amount);
    setData(prev => ({ ...prev, totalSavings: amount }));
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    console.log('Adding expense:', newExpense);
    setData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
  };

  const deleteExpense = (id: string) => {
    console.log('Deleting expense:', id);
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(exp => exp.id !== id),
    }));
  };

  const toggleSurvivalMode = () => {
    console.log('Toggling survival mode');
    setData(prev => ({ ...prev, survivalMode: !prev.survivalMode }));
  };

  const setCurrency = (currency: string) => {
    console.log('Setting currency:', currency);
    setData(prev => ({ ...prev, currency }));
  };

  const resetData = async () => {
    try {
      console.log('Resetting budget data...');
      await AsyncStorage.removeItem(STORAGE_KEY);
      setData(defaultData);
      console.log('Budget data reset successfully');
    } catch (e) {
      console.error('Error resetting budget data:', e);
    }
  };

  console.log('BudgetProvider rendering, loading:', loading);

  return (
    <BudgetContext.Provider
      value={{
        monthlyIncome: data.monthlyIncome,
        totalSavings: data.totalSavings,
        expenses: data.expenses,
        survivalMode: data.survivalMode,
        currency: data.currency,
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

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}

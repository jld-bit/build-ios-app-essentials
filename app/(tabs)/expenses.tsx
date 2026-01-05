
import { useBudget } from '@/contexts/BudgetContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { IconSymbol } from '@/components/IconSymbol';

export default function ExpensesScreen() {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'essential' | 'non-essential'>('essential');
  const colorScheme = useColorScheme();
  const { expenses, addExpense, deleteExpense, currency } = useBudget();

  const isDark = colorScheme === 'dark';

  const handleAddExpense = () => {
    if (!expenseName.trim() || !expenseAmount.trim()) {
      Alert.alert('Error', 'Please enter both expense name and amount');
      return;
    }

    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    addExpense({
      name: expenseName.trim(),
      amount,
      category: selectedCategory,
    });

    setExpenseName('');
    setExpenseAmount('');
    setSelectedCategory('essential');
  };

  const handleDeleteExpense = (id: string, expenseName: string) => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${expenseName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExpense(id),
        },
      ]
    );
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const essentialExpenses = expenses.filter(e => e.category === 'essential');
  const nonEssentialExpenses = expenses.filter(e => e.category === 'non-essential');
  const totalEssential = essentialExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalNonEssential = nonEssentialExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Monthly Expenses</Text>

        <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' }]}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Expense Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#2c2c2e' : '#fff',
                color: isDark ? '#fff' : '#000',
              },
            ]}
            placeholder="e.g., Rent, Groceries"
            placeholderTextColor={isDark ? '#8e8e93' : '#999'}
            value={expenseName}
            onChangeText={setExpenseName}
          />

          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Amount ({currency})</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#2c2c2e' : '#fff',
                color: isDark ? '#fff' : '#000',
              },
            ]}
            placeholder="0"
            placeholderTextColor={isDark ? '#8e8e93' : '#999'}
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />

          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Category</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'essential' && styles.categoryButtonActive,
                {
                  backgroundColor: selectedCategory === 'essential' 
                    ? '#34C759' 
                    : (isDark ? '#2c2c2e' : '#fff'),
                  borderColor: selectedCategory === 'essential' 
                    ? '#34C759' 
                    : (isDark ? '#3a3a3c' : '#d1d1d6'),
                },
              ]}
              onPress={() => setSelectedCategory('essential')}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  {
                    color: selectedCategory === 'essential' 
                      ? '#fff' 
                      : (isDark ? '#fff' : '#000'),
                  },
                ]}
              >
                Essential
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'non-essential' && styles.categoryButtonActive,
                {
                  backgroundColor: selectedCategory === 'non-essential' 
                    ? '#FF9500' 
                    : (isDark ? '#2c2c2e' : '#fff'),
                  borderColor: selectedCategory === 'non-essential' 
                    ? '#FF9500' 
                    : (isDark ? '#3a3a3c' : '#d1d1d6'),
                },
              ]}
              onPress={() => setSelectedCategory('non-essential')}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  {
                    color: selectedCategory === 'non-essential' 
                      ? '#fff' 
                      : (isDark ? '#fff' : '#000'),
                  },
                ]}
              >
                Non-Essential
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: isDark ? '#8e8e93' : '#666' }]}>
              Total Expenses:
            </Text>
            <Text style={[styles.summaryValue, { color: isDark ? '#fff' : '#000' }]}>
              {currency}{totalExpenses.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#34C759' }]}>
              Essential:
            </Text>
            <Text style={[styles.summaryValue, { color: '#34C759' }]}>
              {currency}{totalEssential.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#FF9500' }]}>
              Non-Essential:
            </Text>
            <Text style={[styles.summaryValue, { color: '#FF9500' }]}>
              {currency}{totalNonEssential.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Your Expenses
          </Text>

          {expenses.length === 0 ? (
            <Text style={[styles.emptyText, { color: isDark ? '#8e8e93' : '#999' }]}>
              No expenses added yet
            </Text>
          ) : (
            <React.Fragment>
              {essentialExpenses.length > 0 && (
                <React.Fragment>
                  <Text style={[styles.categoryHeader, { color: '#34C759' }]}>
                    Essential Expenses
                  </Text>
                  {essentialExpenses.map((expense, index) => (
                    <View
                      key={`${expense.id}-${index}`}
                      style={[
                        styles.expenseItem,
                        { 
                          backgroundColor: isDark ? '#2c2c2e' : '#fff',
                          borderLeftColor: '#34C759',
                          borderLeftWidth: 4,
                        },
                      ]}
                    >
                      <View style={styles.expenseInfo}>
                        <Text style={[styles.expenseName, { color: isDark ? '#fff' : '#000' }]}>
                          {expense.name}
                        </Text>
                        <Text style={[styles.expenseAmount, { color: isDark ? '#fff' : '#000' }]}>
                          {currency}{expense.amount.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleDeleteExpense(expense.id, expense.name)}
                        style={styles.deleteButton}
                      >
                        <IconSymbol
                          ios_icon_name="trash"
                          android_material_icon_name="delete"
                          size={20}
                          color="#ff3b30"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </React.Fragment>
              )}

              {nonEssentialExpenses.length > 0 && (
                <React.Fragment>
                  <Text style={[styles.categoryHeader, { color: '#FF9500', marginTop: 16 }]}>
                    Non-Essential Expenses
                  </Text>
                  {nonEssentialExpenses.map((expense, index) => (
                    <View
                      key={`${expense.id}-${index}`}
                      style={[
                        styles.expenseItem,
                        { 
                          backgroundColor: isDark ? '#2c2c2e' : '#fff',
                          borderLeftColor: '#FF9500',
                          borderLeftWidth: 4,
                        },
                      ]}
                    >
                      <View style={styles.expenseInfo}>
                        <Text style={[styles.expenseName, { color: isDark ? '#fff' : '#000' }]}>
                          {expense.name}
                        </Text>
                        <Text style={[styles.expenseAmount, { color: isDark ? '#fff' : '#000' }]}>
                          {currency}{expense.amount.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleDeleteExpense(expense.id, expense.name)}
                        style={styles.deleteButton}
                      >
                        <IconSymbol
                          ios_icon_name="trash"
                          android_material_icon_name="delete"
                          size={20}
                          color="#ff3b30"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  categoryButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  categoryButtonActive: {
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoryHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  expenseAmount: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
});

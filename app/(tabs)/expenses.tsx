
import React, { useState } from 'react';
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
import { useBudget } from '@/contexts/BudgetContext';

export default function ExpensesScreen() {
  const { expenses, currency, addExpense, deleteExpense } = useBudget();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'essential' | 'non-essential'>('essential');

  const handleAddExpense = () => {
    if (!name.trim() || !amount) {
      Alert.alert('Missing Information', 'Please enter both name and amount');
      return;
    }
    addExpense({
      name: name.trim(),
      amount: parseFloat(amount),
      category,
    });
    setName('');
    setAmount('');
  };

  const handleDeleteExpense = (id: string, expenseName: string) => {
    Alert.alert(
      'Delete Expense',
      `Remove "${expenseName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteExpense(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#141414' : '#fafafa' }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: isDark ? '#f0f0f0' : '#323232' }]}>
          Expenses
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#b0b0b0' : '#666' }]}>
          Track where your money goes
        </Text>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
            Add New Expense
          </Text>
          <TextInput
            style={[styles.input, { color: isDark ? '#f0f0f0' : '#323232', borderColor: isDark ? '#323232' : '#dcdcdc', backgroundColor: isDark ? '#141414' : '#fafafa' }]}
            placeholder="Expense name"
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={name}
            onChangeText={setName}
          />
          <View style={styles.amountRow}>
            <Text style={[styles.currencySymbol, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              {currency}
            </Text>
            <TextInput
              style={[styles.input, styles.amountInput, { color: isDark ? '#f0f0f0' : '#323232', borderColor: isDark ? '#323232' : '#dcdcdc', backgroundColor: isDark ? '#141414' : '#fafafa' }]}
              placeholder="0.00"
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.categoryRow}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'essential' && styles.categoryButtonActive,
                { borderColor: isDark ? '#323232' : '#dcdcdc' },
              ]}
              onPress={() => setCategory('essential')}
            >
              <Text style={[
                styles.categoryButtonText,
                category === 'essential' && styles.categoryButtonTextActive,
                { color: category === 'essential' ? '#fff' : (isDark ? '#b0b0b0' : '#666') },
              ]}>
                Essential
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'non-essential' && styles.categoryButtonActive,
                { borderColor: isDark ? '#323232' : '#dcdcdc' },
              ]}
              onPress={() => setCategory('non-essential')}
            >
              <Text style={[
                styles.categoryButtonText,
                category === 'non-essential' && styles.categoryButtonTextActive,
                { color: category === 'non-essential' ? '#fff' : (isDark ? '#b0b0b0' : '#666') },
              ]}>
                Non-Essential
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
          Your Expenses
        </Text>
        {expenses.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
            <Text style={[styles.emptyText, { color: isDark ? '#b0b0b0' : '#666' }]}>
              No expenses yet. Add one above to get started.
            </Text>
          </View>
        ) : (
          expenses.map(expense => (
            <View
              key={expense.id}
              style={[styles.expenseCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}
            >
              <View style={styles.expenseInfo}>
                <Text style={[styles.expenseName, { color: isDark ? '#f0f0f0' : '#323232' }]}>
                  {expense.name}
                </Text>
                <Text style={[styles.expenseCategory, { color: isDark ? '#b0b0b0' : '#666' }]}>
                  {expense.category === 'essential' ? '🛡️ Essential' : '✨ Non-Essential'}
                </Text>
              </View>
              <View style={styles.expenseRight}>
                <Text style={[styles.expenseAmount, { color: isDark ? '#f0f0f0' : '#323232' }]}>
                  {currency}{expense.amount.toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeleteExpense(expense.id, expense.name)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#64c896',
    borderColor: '#64c896',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#64c896',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  expenseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  expenseCategory: {
    fontSize: 14,
  },
  expenseRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

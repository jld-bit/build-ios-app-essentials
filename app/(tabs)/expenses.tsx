
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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ExpensesScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const { expenses, currency, addExpense, deleteExpense } = useBudget();

  const [showAddForm, setShowAddForm] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'essential' | 'non-essential'>('essential');

  const handleAddExpense = () => {
    if (!expenseName.trim()) {
      Alert.alert('Missing Information', 'Please enter an expense name');
      return;
    }
    if (!expenseAmount.trim() || parseFloat(expenseAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    addExpense({
      name: expenseName.trim(),
      amount: parseFloat(expenseAmount),
      category: selectedCategory,
    });

    // Reset form
    setExpenseName('');
    setExpenseAmount('');
    setSelectedCategory('essential');
    setShowAddForm(false);
  };

  const handleDeleteExpense = (id: string, name: string) => {
    Alert.alert(
      'Remove Expense',
      `Remove "${name}" from your expenses?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => deleteExpense(id)
        },
      ]
    );
  };

  const essentialExpenses = expenses.filter(exp => exp.category === 'essential');
  const nonEssentialExpenses = expenses.filter(exp => exp.category === 'non-essential');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Your Expenses
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Track where your money goes
          </Text>
        </View>

        {/* Add Expense Button */}
        {!showAddForm && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => setShowAddForm(true)}
          >
            <IconSymbol
              ios_icon_name="plus.circle.fill"
              android_material_icon_name="add-circle"
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        )}

        {/* Add Expense Form */}
        {showAddForm && (
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              New Expense
            </Text>

            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Expense Name
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              }]}
              value={expenseName}
              onChangeText={setExpenseName}
              placeholder="e.g., Rent, Groceries, Netflix"
              placeholderTextColor={theme.textSecondary}
            />

            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Amount
            </Text>
            <View style={styles.amountRow}>
              <Text style={[styles.currencySymbol, { color: theme.text }]}>
                {currency}
              </Text>
              <TextInput
                style={[styles.input, { 
                  flex: 1,
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.border,
                }]}
                value={expenseAmount}
                onChangeText={setExpenseAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Category
            </Text>
            <View style={styles.categoryButtons}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === 'essential' && { backgroundColor: theme.essential },
                  { borderColor: theme.essential },
                ]}
                onPress={() => setSelectedCategory('essential')}
              >
                <Text style={[
                  styles.categoryButtonText,
                  { color: selectedCategory === 'essential' ? '#FFFFFF' : theme.essential }
                ]}>
                  Essential
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === 'non-essential' && { backgroundColor: theme.nonEssential },
                  { borderColor: theme.nonEssential },
                ]}
                onPress={() => setSelectedCategory('non-essential')}
              >
                <Text style={[
                  styles.categoryButtonText,
                  { color: selectedCategory === 'non-essential' ? '#FFFFFF' : theme.nonEssential }
                ]}>
                  Non-Essential
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.formButton, { backgroundColor: theme.border }]}
                onPress={() => {
                  setShowAddForm(false);
                  setExpenseName('');
                  setExpenseAmount('');
                  setSelectedCategory('essential');
                }}
              >
                <Text style={[styles.formButtonText, { color: theme.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formButton, { backgroundColor: theme.primary }]}
                onPress={handleAddExpense}
              >
                <Text style={[styles.formButtonText, { color: '#FFFFFF' }]}>
                  Add Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Essential Expenses */}
        {essentialExpenses.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol
                ios_icon_name="house.fill"
                android_material_icon_name="home"
                size={20}
                color={theme.essential}
              />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Essential Expenses
              </Text>
            </View>
            {essentialExpenses.map((expense) => (
              <View
                key={expense.id}
                style={[styles.expenseCard, { backgroundColor: theme.cardBackground }]}
              >
                <View style={styles.expenseInfo}>
                  <Text style={[styles.expenseName, { color: theme.text }]}>
                    {expense.name}
                  </Text>
                  <Text style={[styles.expenseAmount, { color: theme.essential }]}>
                    {currency}{expense.amount.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteExpense(expense.id, expense.name)}
                  style={styles.deleteButton}
                >
                  <IconSymbol
                    ios_icon_name="trash.fill"
                    android_material_icon_name="delete"
                    size={20}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Non-Essential Expenses */}
        {nonEssentialExpenses.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol
                ios_icon_name="star.fill"
                android_material_icon_name="star"
                size={20}
                color={theme.nonEssential}
              />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Non-Essential Expenses
              </Text>
            </View>
            {nonEssentialExpenses.map((expense) => (
              <View
                key={expense.id}
                style={[styles.expenseCard, { backgroundColor: theme.cardBackground }]}
              >
                <View style={styles.expenseInfo}>
                  <Text style={[styles.expenseName, { color: theme.text }]}>
                    {expense.name}
                  </Text>
                  <Text style={[styles.expenseAmount, { color: theme.nonEssential }]}>
                    {currency}{expense.amount.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteExpense(expense.id, expense.name)}
                  style={styles.deleteButton}
                >
                  <IconSymbol
                    ios_icon_name="trash.fill"
                    android_material_icon_name="delete"
                    size={20}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {expenses.length === 0 && !showAddForm && (
          <View style={[styles.emptyState, { backgroundColor: theme.cardBackground }]}>
            <IconSymbol
              ios_icon_name="list.bullet"
              android_material_icon_name="receipt"
              size={48}
              color={theme.textSecondary}
            />
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              No expenses yet. Add your first expense to start tracking.
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
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
    paddingTop: Platform.OS === 'android' ? 48 : 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  formButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  expenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
});

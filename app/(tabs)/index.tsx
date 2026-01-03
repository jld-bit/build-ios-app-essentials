
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function OverviewScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const {
    monthlyIncome,
    totalSavings,
    expenses,
    currency,
    setMonthlyIncome,
    setTotalSavings,
    loading,
  } = useBudget();

  const [incomeInput, setIncomeInput] = useState(monthlyIncome.toString());
  const [savingsInput, setSavingsInput] = useState(totalSavings.toString());

  useEffect(() => {
    console.log('OverviewScreen mounted');
  }, []);

  useEffect(() => {
    setIncomeInput(monthlyIncome.toString());
  }, [monthlyIncome]);

  useEffect(() => {
    setSavingsInput(totalSavings.toString());
  }, [totalSavings]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const essentialExpenses = expenses
    .filter(exp => exp.category === 'essential')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const nonEssentialExpenses = expenses
    .filter(exp => exp.category === 'non-essential')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = monthlyIncome - totalExpenses;

  const handleIncomeSubmit = () => {
    const value = parseFloat(incomeInput) || 0;
    setMonthlyIncome(value);
  };

  const handleSavingsSubmit = () => {
    const value = parseFloat(savingsInput) || 0;
    setTotalSavings(value);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading your budget...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            You&apos;re Taking Control
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Focus on what matters most
          </Text>
        </View>

        {/* Income Input Card */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <IconSymbol
              ios_icon_name="dollarsign.circle.fill"
              android_material_icon_name="attach-money"
              size={24}
              color={theme.primary}
            />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Monthly Income
            </Text>
          </View>
          <View style={styles.inputRow}>
            <Text style={[styles.currencySymbol, { color: theme.text }]}>
              {currency}
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              }]}
              value={incomeInput}
              onChangeText={setIncomeInput}
              onBlur={handleIncomeSubmit}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={theme.textSecondary}
            />
          </View>
          <Text style={[styles.helpText, { color: theme.textSecondary }]}>
            Enter your monthly income or unemployment benefit
          </Text>
        </View>

        {/* Savings Input Card */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <IconSymbol
              ios_icon_name="banknote.fill"
              android_material_icon_name="savings"
              size={24}
              color={theme.secondary}
            />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Total Savings
            </Text>
          </View>
          <View style={styles.inputRow}>
            <Text style={[styles.currencySymbol, { color: theme.text }]}>
              {currency}
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              }]}
              value={savingsInput}
              onChangeText={setSavingsInput}
              onBlur={handleSavingsSubmit}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={theme.textSecondary}
            />
          </View>
          <Text style={[styles.helpText, { color: theme.textSecondary }]}>
            Optional: Track your emergency fund
          </Text>
        </View>

        {/* Budget Summary Card */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 16 }]}>
            This Month&apos;s Budget
          </Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Monthly Income
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {currency}{monthlyIncome.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.essential }]}>
              Essential Expenses
            </Text>
            <Text style={[styles.summaryValue, { color: theme.essential }]}>
              {currency}{essentialExpenses.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.nonEssential }]}>
              Non-Essential Expenses
            </Text>
            <Text style={[styles.summaryValue, { color: theme.nonEssential }]}>
              {currency}{nonEssentialExpenses.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.text, fontWeight: '600' }]}>
              Remaining
            </Text>
            <Text style={[
              styles.summaryValue, 
              { 
                color: remaining >= 0 ? theme.success : theme.warning,
                fontWeight: '700',
                fontSize: 20,
              }
            ]}>
              {currency}{remaining.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Encouraging Message */}
        {remaining >= 0 && totalExpenses > 0 && (
          <View style={[styles.messageCard, { backgroundColor: theme.success + '20' }]}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check-circle"
              size={32}
              color={theme.success}
            />
            <Text style={[styles.messageText, { color: theme.text }]}>
              You&apos;re staying within your budget this month. Small steps make a difference!
            </Text>
          </View>
        )}

        {nonEssentialExpenses > 0 && (
          <View style={[styles.messageCard, { backgroundColor: theme.primary + '20' }]}>
            <IconSymbol
              ios_icon_name="lightbulb.fill"
              android_material_icon_name="info"
              size={32}
              color={theme.primary}
            />
            <Text style={[styles.messageText, { color: theme.text }]}>
              You have {currency}{nonEssentialExpenses.toFixed(2)} in non-essential expenses. 
              Enable Survival Mode to see where you can save.
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
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
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  helpText: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
    opacity: 0.3,
  },
  messageCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
});

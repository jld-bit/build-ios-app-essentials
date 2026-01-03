
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function SurvivalScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const { expenses, currency, survivalMode, toggleSurvivalMode } = useBudget();

  const nonEssentialExpenses = expenses.filter(exp => exp.category === 'non-essential');
  const totalNonEssential = nonEssentialExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const essentialExpenses = expenses.filter(exp => exp.category === 'essential');
  const totalEssential = essentialExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Survival Mode
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Focus on essentials only
          </Text>
        </View>

        {/* Survival Mode Toggle */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.toggleHeader}>
            <View style={styles.toggleInfo}>
              <IconSymbol
                ios_icon_name="shield.fill"
                android_material_icon_name="favorite"
                size={32}
                color={survivalMode ? theme.success : theme.textSecondary}
              />
              <View style={styles.toggleText}>
                <Text style={[styles.toggleTitle, { color: theme.text }]}>
                  Survival Mode
                </Text>
                <Text style={[styles.toggleSubtitle, { color: theme.textSecondary }]}>
                  {survivalMode ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                { backgroundColor: survivalMode ? theme.success : theme.border }
              ]}
              onPress={toggleSurvivalMode}
            >
              <View style={[
                styles.toggleKnob,
                survivalMode && styles.toggleKnobActive
              ]} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.toggleDescription, { color: theme.textSecondary }]}>
            When enabled, non-essential expenses are highlighted to help you identify areas to reduce spending.
          </Text>
        </View>

        {/* Savings Potential */}
        {totalNonEssential > 0 && (
          <View style={[styles.savingsCard, { backgroundColor: theme.success + '20' }]}>
            <IconSymbol
              ios_icon_name="arrow.down.circle.fill"
              android_material_icon_name="trending-down"
              size={40}
              color={theme.success}
            />
            <View style={styles.savingsContent}>
              <Text style={[styles.savingsLabel, { color: theme.textSecondary }]}>
                Potential Monthly Savings
              </Text>
              <Text style={[styles.savingsAmount, { color: theme.success }]}>
                {currency}{totalNonEssential.toFixed(2)}
              </Text>
              <Text style={[styles.savingsText, { color: theme.text }]}>
                By pausing non-essential expenses, you could save this amount each month.
              </Text>
            </View>
          </View>
        )}

        {/* Essential Expenses Summary */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <IconSymbol
              ios_icon_name="checkmark.shield.fill"
              android_material_icon_name="check-circle"
              size={24}
              color={theme.essential}
            />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Essential Expenses
            </Text>
          </View>
          <Text style={[styles.essentialAmount, { color: theme.essential }]}>
            {currency}{totalEssential.toFixed(2)}
          </Text>
          <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>
            These are your must-have expenses. Focus on keeping these covered first.
          </Text>
          {essentialExpenses.length > 0 && (
            <View style={styles.expenseList}>
              {essentialExpenses.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <Text style={[styles.expenseItemName, { color: theme.text }]}>
                    • {expense.name}
                  </Text>
                  <Text style={[styles.expenseItemAmount, { color: theme.textSecondary }]}>
                    {currency}{expense.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Non-Essential Expenses */}
        {nonEssentialExpenses.length > 0 && (
          <View style={[
            styles.card, 
            { 
              backgroundColor: survivalMode ? theme.warning + '20' : theme.cardBackground,
              borderWidth: survivalMode ? 2 : 0,
              borderColor: survivalMode ? theme.warning : 'transparent',
            }
          ]}>
            <View style={styles.cardHeader}>
              <IconSymbol
                ios_icon_name="exclamationmark.triangle.fill"
                android_material_icon_name="warning"
                size={24}
                color={theme.warning}
              />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Non-Essential Expenses
              </Text>
            </View>
            <Text style={[styles.nonEssentialAmount, { color: theme.warning }]}>
              {currency}{totalNonEssential.toFixed(2)}
            </Text>
            <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>
              Consider pausing or reducing these expenses during your recovery period.
            </Text>
            <View style={styles.expenseList}>
              {nonEssentialExpenses.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <Text style={[styles.expenseItemName, { color: theme.text }]}>
                    • {expense.name}
                  </Text>
                  <Text style={[styles.expenseItemAmount, { color: theme.textSecondary }]}>
                    {currency}{expense.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Encouraging Message */}
        <View style={[styles.messageCard, { backgroundColor: theme.primary + '20' }]}>
          <IconSymbol
            ios_icon_name="heart.fill"
            android_material_icon_name="favorite"
            size={32}
            color={theme.primary}
          />
          <Text style={[styles.messageText, { color: theme.text }]}>
            Remember: This is temporary. You&apos;re making smart choices to protect your financial future. Every small step counts.
          </Text>
        </View>

        {expenses.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: theme.cardBackground }]}>
            <IconSymbol
              ios_icon_name="list.bullet"
              android_material_icon_name="receipt"
              size={48}
              color={theme.textSecondary}
            />
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              Add expenses in the Expenses tab to see your survival budget analysis.
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
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleText: {
    marginLeft: 12,
  },
  toggleTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  toggleSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  toggle: {
    width: 60,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  toggleDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  savingsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsContent: {
    flex: 1,
    marginLeft: 16,
  },
  savingsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  savingsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  essentialAmount: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  nonEssentialAmount: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  expenseList: {
    marginTop: 8,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  expenseItemName: {
    fontSize: 15,
    flex: 1,
  },
  expenseItemAmount: {
    fontSize: 15,
    fontWeight: '500',
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


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';

export default function SurvivalScreen() {
  const { expenses, currency, survivalMode, toggleSurvivalMode } = useBudget();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const nonEssentialExpenses = expenses.filter(e => e.category === 'non-essential');
  const totalNonEssential = nonEssentialExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#141414' : '#fafafa' }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: isDark ? '#f0f0f0' : '#323232' }]}>
          Survival Mode
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#b0b0b0' : '#666' }]}>
          Focus on what matters most
        </Text>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={[styles.toggleTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
                Survival Mode
              </Text>
              <Text style={[styles.toggleDescription, { color: isDark ? '#b0b0b0' : '#666' }]}>
                Highlight non-essential expenses
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                survivalMode && styles.toggleActive,
                { backgroundColor: survivalMode ? '#64c896' : (isDark ? '#323232' : '#dcdcdc') },
              ]}
              onPress={toggleSurvivalMode}
            >
              <View style={[
                styles.toggleThumb,
                survivalMode && styles.toggleThumbActive,
              ]} />
            </TouchableOpacity>
          </View>
        </View>

        {survivalMode && (
          <React.Fragment>
            <View style={[styles.infoCard, { backgroundColor: isDark ? '#1e3a2e' : '#e8f5f0' }]}>
              <Text style={[styles.infoTitle, { color: isDark ? '#90d4b8' : '#2d8a5f' }]}>
                💡 Potential Savings
              </Text>
              <Text style={[styles.infoAmount, { color: isDark ? '#90d4b8' : '#2d8a5f' }]}>
                {currency}{totalNonEssential.toFixed(2)}
              </Text>
              <Text style={[styles.infoText, { color: isDark ? '#90d4b8' : '#2d8a5f' }]}>
                You could save this much by cutting non-essentials
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              Non-Essential Expenses
            </Text>
            {nonEssentialExpenses.length === 0 ? (
              <View style={[styles.emptyCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
                <Text style={[styles.emptyText, { color: isDark ? '#b0b0b0' : '#666' }]}>
                  🎉 Great job! You have no non-essential expenses.
                </Text>
              </View>
            ) : (
              nonEssentialExpenses.map((expense, index) => (
                <View
                  key={expense.id}
                  style={[styles.expenseCard, { backgroundColor: isDark ? '#3a1e1e' : '#fff5f5', borderColor: isDark ? '#5a2e2e' : '#ffe0e0' }]}
                >
                  <View style={styles.expenseInfo}>
                    <Text style={[styles.expenseName, { color: isDark ? '#ffb0b0' : '#d63031' }]}>
                      {expense.name}
                    </Text>
                    <Text style={[styles.expenseHint, { color: isDark ? '#d08080' : '#e17055' }]}>
                      Consider pausing or removing this
                    </Text>
                  </View>
                  <Text style={[styles.expenseAmount, { color: isDark ? '#ffb0b0' : '#d63031' }]}>
                    {currency}{expense.amount.toFixed(2)}
                  </Text>
                </View>
              ))
            )}

            <View style={[styles.tipsCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
              <Text style={[styles.tipsTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
                💪 Small Steps Make a Difference
              </Text>
              <Text style={[styles.tipText, { color: isDark ? '#b0b0b0' : '#666' }]}>
                • Cancel unused subscriptions{'\n'}
                • Cook at home instead of eating out{'\n'}
                • Postpone non-urgent purchases{'\n'}
                • Look for free entertainment options
              </Text>
            </View>
          </React.Fragment>
        )}

        {!survivalMode && (
          <View style={[styles.emptyCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
            <Text style={[styles.emptyText, { color: isDark ? '#b0b0b0' : '#666' }]}>
              Enable Survival Mode to see suggestions for reducing expenses
            </Text>
          </View>
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
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
  },
  toggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#64c896',
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    transform: [{ translateX: 24 }],
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    textAlign: 'center',
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
    borderWidth: 2,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  expenseHint: {
    fontSize: 13,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 24,
  },
});

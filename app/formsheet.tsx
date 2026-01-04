
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { GlassView } from 'expo-glass-effect';
import { useTheme } from '@react-navigation/native';

export default function FormSheetModal() {
  const theme = useTheme();

  // Use a visible dark gray for dark mode instead of pure black
  const backgroundColor = theme.dark
    ? 'rgb(28, 28, 30)' // Dark gray that's visible against black backgrounds
    : theme.colors.background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
        
        {/* Currency Section */}
        <GlassView style={styles.section} glassEffectStyle="regular">
          <View style={styles.sectionRow}>
            <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Currency</Text>
            <Text style={[styles.sectionValue, { color: theme.dark ? '#98989D' : '#666' }]}>$</Text>
          </View>
        </GlassView>

        {/* Disclaimer Section */}
        <GlassView style={styles.section} glassEffectStyle="regular">
          <View style={styles.sectionRow}>
            <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Disclaimer</Text>
            <Text style={[styles.chevron, { color: theme.dark ? '#98989D' : '#666' }]}>›</Text>
          </View>
        </GlassView>
      </ScrollView>

      <Pressable onPress={() => router.back()} style={styles.closeButton}>
        <GlassView style={styles.button} glassEffectStyle="clear">
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>Close</Text>
        </GlassView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  sectionValue: {
    fontSize: 17,
    fontWeight: '400',
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

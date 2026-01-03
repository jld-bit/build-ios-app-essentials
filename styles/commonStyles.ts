
import { StyleSheet } from 'react-native';

// Calming color palette for survival budget app
export const colors = {
  // Light mode colors
  light: {
    background: '#F8FAFB',
    cardBackground: '#FFFFFF',
    primary: '#5BA3C5', // Soft blue
    secondary: '#7BC4A4', // Soft green
    accent: '#F5D98B', // Warm cream/yellow
    text: '#2C3E50',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#7BC4A4',
    warning: '#F5D98B',
    essential: '#5BA3C5',
    nonEssential: '#C4A5D4', // Soft purple
  },
  // Dark mode colors
  dark: {
    background: '#1A1F2E',
    cardBackground: '#252B3B',
    primary: '#5BA3C5',
    secondary: '#7BC4A4',
    accent: '#F5D98B',
    text: '#F8FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    success: '#7BC4A4',
    warning: '#F5D98B',
    essential: '#5BA3C5',
    nonEssential: '#C4A5D4',
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
});

export default colors;

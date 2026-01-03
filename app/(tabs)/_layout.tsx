
import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark ? '#98989D' : '#8E8E93',
        tabBarStyle: {
          backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDark ? '#38383A' : '#E5E5EA',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="chart.bar.fill" 
              android_material_icon_name="home" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="list.bullet" 
              android_material_icon_name="receipt" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="survival"
        options={{
          title: 'Survival',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="shield.checkmark" 
              android_material_icon_name="security" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              ios_icon_name="gear" 
              android_material_icon_name="settings" 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

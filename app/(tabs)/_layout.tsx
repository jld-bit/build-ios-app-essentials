
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: 'index',
      route: '/(tabs)/',
      icon: 'analytics',
      label: 'Overview',
    },
    {
      name: 'expenses',
      route: '/(tabs)/expenses',
      icon: 'receipt',
      label: 'Expenses',
    },
    {
      name: 'survival',
      route: '/(tabs)/survival',
      icon: 'shield',
      label: 'Survival',
    },
    {
      name: 'settings',
      route: '/(tabs)/settings',
      icon: 'settings',
      label: 'Settings',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="overview" name="index" />
        <Stack.Screen key="expenses" name="expenses" />
        <Stack.Screen key="survival" name="survival" />
        <Stack.Screen key="settings" name="settings" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}


import React from 'react';
import FloatingTabBar from '@/components/FloatingTabBar';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="expenses" />
        <Stack.Screen name="survival" />
        <Stack.Screen name="settings" />
      </Stack>
      <FloatingTabBar
        tabs={[
          {
            route: '/(tabs)',
            label: 'Overview',
            ios_icon_name: 'chart.bar.fill',
            android_material_icon_name: 'home',
          },
          {
            route: '/(tabs)/expenses',
            label: 'Expenses',
            ios_icon_name: 'list.bullet',
            android_material_icon_name: 'receipt',
          },
          {
            route: '/(tabs)/survival',
            label: 'Survival',
            ios_icon_name: 'shield.fill',
            android_material_icon_name: 'favorite',
          },
          {
            route: '/(tabs)/settings',
            label: 'Settings',
            ios_icon_name: 'gearshape.fill',
            android_material_icon_name: 'settings',
          },
        ]}
      />
    </>
  );
}


import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger key="overview" name="index">
        <Icon sf="chart.bar.fill" />
        <Label>Overview</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="expenses" name="expenses">
        <Icon sf="receipt.fill" />
        <Label>Expenses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="survival" name="survival">
        <Icon sf="shield.fill" />
        <Label>Survival</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="settings" name="settings">
        <Icon sf="gearshape.fill" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

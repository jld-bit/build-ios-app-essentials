
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BudgetProvider } from '@/contexts/BudgetContext';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: 'rgb(100, 200, 150)',
      background: 'rgb(250, 250, 250)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(50, 50, 50)',
      border: 'rgb(220, 220, 220)',
      notification: 'rgb(100, 200, 150)',
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: 'rgb(100, 200, 150)',
      background: 'rgb(20, 20, 20)',
      card: 'rgb(30, 30, 30)',
      text: 'rgb(240, 240, 240)',
      border: 'rgb(50, 50, 50)',
      notification: 'rgb(100, 200, 150)',
    },
  };

  return (
    <>
      <StatusBar style="auto" animated />
      <ThemeProvider
        value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}
      >
        <BudgetProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="disclaimer"
                options={{
                  presentation: 'modal',
                  title: 'Disclaimer',
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </BudgetProvider>
      </ThemeProvider>
    </>
  );
}

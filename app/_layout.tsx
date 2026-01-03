
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { BudgetProvider } from "@/contexts/BudgetContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    console.log('RootLayout mounted');
    if (loaded) {
      console.log('Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync();
      // Give a moment for everything to initialize
      setTimeout(() => {
        console.log('App ready');
        setAppReady(true);
      }, 100);
    }
  }, [loaded]);

  if (!loaded || !appReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading your budget app...</Text>
      </View>
    );
  }

  console.log('Rendering main app');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <BudgetProvider>
          <SystemBars style={colorScheme === "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="disclaimer" 
              options={{ 
                headerShown: true,
                title: "Disclaimer",
                presentation: "modal"
              }} 
            />
          </Stack>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </BudgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});

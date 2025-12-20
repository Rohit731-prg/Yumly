import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#f9f9f9" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />   {/* 👈 LOGIN */}
        <Stack.Screen name="(tabs)" />  {/* 👈 MAIN APP */}
      </Stack>
    </>
  );
}

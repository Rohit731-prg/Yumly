import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />   {/* 👈 LOGIN */}
      <Stack.Screen name="(tabs)" />  {/* 👈 MAIN APP */}
    </Stack>
  );
}

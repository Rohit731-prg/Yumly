import { Tabs } from "expo-router";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({ focused }) => focused ? <Ionicons name="home" size={24} color="black" /> : <Ionicons name="home-outline" size={24} color="black" />
      }}/>
    </Tabs>
  );
}


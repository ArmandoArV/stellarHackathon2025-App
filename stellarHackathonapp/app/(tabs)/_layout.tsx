import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import {
  HouseIcon,
  BookOpenIcon,
  ChartPieIcon,
} from "../components/ui/TabBarIcons";
import TabBarBackground from "../../components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CircularTabIcon } from "@/app/components/ui/CircularTabIcon"; // << NEW

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          paddingTop: 0,
          paddingBottom: 0,
          paddingHorizontal: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 100,

          ...(Platform.OS === "ios" && {
            paddingTop: 10,
            paddingBottom: 10,
          }),
          backgroundColor: "transparent",
          top: 15,
          borderRadius: 20,
          marginHorizontal: 5,
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <CircularTabIcon focused={focused}>
              <BookOpenIcon color={focused ? "#FFF" : "#161616"} size={40} />
            </CircularTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <CircularTabIcon focused={focused}>
              <HouseIcon color={focused ? "#FFF" : "#161616"} size={40} />
            </CircularTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <CircularTabIcon focused={focused}>
              <ChartPieIcon color={focused ? "#FFF" : "#161616"} size={40} />
            </CircularTabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

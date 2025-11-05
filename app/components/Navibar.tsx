import { Link, Tabs, useRouter } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, Platform, View, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export default function Navibar() {
  // ----- Mobile: bottom tabs -----
  if (Platform.OS !== "web") {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.dark.vibrantAccent,
          tabBarInactiveTintColor: colors.dark.primary,
          tabBarStyle: { backgroundColor: colors.dark.background },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Pantry",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="grocery"
          options={{
            title: "Grocery",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="basket" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipes"
          options={{
            title: "recipes",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="logo-buffer" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  // ----- Web: vertical sidebar -----
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);        // end Firebase session
      router.replace("/login");   // single redirect target
    } catch (e) {
      console.error("logout error", e);
    }
  };

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {/* Sidebar */}
      <View
        style={{
          width: "20%",
          backgroundColor: colors.dark.background,
          paddingVertical: 16,
          borderRightWidth: 1,
          borderRightColor: colors.dark.primary + "20",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Brand */}
        <View style={{ marginBottom: 32, alignItems: "center" }}>
          <Text
            style={{
              color: colors.dark.vibrantAccent,
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 4,
            }}
          >
            Food Pantry App
          </Text>
        </View>

        {/* Nav Links */}
        <View style={{ gap: 24 }}>
          <Link
            href="/screens/home"
            style={{ alignItems: "center", padding: 8, borderRadius: 8 }}
          >
            <Ionicons name="cube" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Pantry
            </Text>
          </Link>

          <Link
            href="/screens/grocery"
            style={{ alignItems: "center", padding: 8, borderRadius: 8 }}
          >
            <Ionicons name="basket" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Grocery
            </Text>
          </Link>

          <Link
            href="/screens/recipes"
            style={{ alignItems: "center", padding: 8, borderRadius: 8 }}
          >
            <Ionicons name="logo-buffer" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Recipes
            </Text>
          </Link>

          <Link
            href="/screens/settings"
            style={{ alignItems: "center", padding: 8, borderRadius: 8 }}
          >
            <Ionicons name="settings" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Settings
            </Text>
          </Link>

          {/* Logout button (NOT a Link) */}
          <Pressable
            onPress={handleLogout}
            style={{ alignItems: "center", padding: 8, borderRadius: 8 }}
          >
            <Ionicons name="push" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Log out
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Content area (tabs hidden on web) */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        >
          <Tabs.Screen name="home" />
          <Tabs.Screen name="grocery" />
          <Tabs.Screen name="recipes" />
          <Tabs.Screen name="settings" />
        </Tabs>
      </View>
    </View>
  );
}

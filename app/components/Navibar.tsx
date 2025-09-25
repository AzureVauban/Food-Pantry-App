import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, Platform, View } from 'react-native';
import { colors } from '../../constants/colors';
export default function Navibar() {
  if (Platform.OS !== 'web') {
    console.log('[NAVIBAR] Rendering Navibar for Mobile');
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
            title: 'Pantry',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="grocery"
          options={{
            title: 'Grocery',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="basket" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipes"
          options={{
            title: 'recipes',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="logo-buffer" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  // Web platform - Vertical sidebar navigation
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* Vertical Navigation Sidebar */}
      <View
        style={{
          width: '20%',
          backgroundColor: colors.dark.background,
          paddingVertical: 16,
          borderRightWidth: 1,
          borderRightColor: colors.dark.primary + '20',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {/* App Logo/Title */}
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <Text
            style={{
              color: colors.dark.vibrantAccent,
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 4,
            }}
          >
            Food Pantry App
          </Text>
        </View>

        {/* Navigation Links */}
        <View style={{ gap: 24 }}>
          <Link
            href="/screens/home"
            style={{
              alignItems: 'center',
              textDecorationLine: 'none',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Ionicons name="cube" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              Pantry
            </Text>
          </Link>

          <Link
            href="/screens/grocery"
            style={{
              alignItems: 'center',
              textDecorationLine: 'none',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Ionicons name="basket" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              Grocery
            </Text>
          </Link>
          <Link
            href="/screens/recipes"
            style={{
              alignItems: 'center',
              textDecorationLine: 'none',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Ionicons
              name="logo-buffer"
              size={24}
              color={colors.dark.primary}
            />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              Recipes
            </Text>
          </Link>
          <Link
            href="/screens/settings"
            style={{
              alignItems: 'center',
              textDecorationLine: 'none',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Ionicons name="settings" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              Settings
            </Text>
          </Link>

          <Link
            href="../login"
            style={{
              alignItems: 'center',
              textDecorationLine: 'none',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Ionicons name="push" size={24} color={colors.dark.primary} />
            <Text
              style={{
                color: colors.dark.primary,
                marginTop: 4,
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              Log out
            </Text>
          </Link>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        {/* This is where your screen content will render */}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
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

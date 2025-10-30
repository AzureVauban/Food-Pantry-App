// app/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { Link } from "expo-router";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthResolved(true);
    });
    return unsub;
  }, []);

  if (!authResolved) {
    // Wait for Firebase to confirm user session on page load
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (user) {
    // ✅ User is signed in (persists after refresh)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Welcome to Food Inventory App
        </Text>

        {!!user.photoURL && (
          <Image
            source={{ uri: user.photoURL }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
        )}

        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Signed in as:{" "}
          <Text style={{ fontWeight: "600" }}>
            {user.displayName || user.email}
          </Text>
        </Text>

        <Button
          title="Logout"
          color="#e74c3c"
          onPress={async () => {
            try {
              await signOut(auth);
              console.log("User signed out successfully");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          }}
        />
      </View>
    );
  }

  // 🔒 Fallback: not signed in (shouldn't show if persistence works)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Welcome to Food Inventory App
      </Text>

      <Text style={{ fontSize: 16 }}>You’re not signed in.</Text>

      <Link href="/login" asChild>
        <Button title="Go to Login" />
      </Link>
    </View>
  );
}

// app/login.tsx
import React, { useEffect, useState } from "react";
import { Button, View, Text, Image } from "react-native";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, persistenceReady } from "../firebase/firebaseConfig";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  // Watch auth state (persists across refreshes)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("[auth] onAuthStateChanged ->", u?.uid || "no user");
      setUser(u);
      if (u) router.replace("/");
    });
    return unsub;
  }, [router]);

  const handleLogin = async () => {
    try {
      await persistenceReady; // ensure persistence is set
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will run automatically
    } catch (e) {
      console.error("Sign-in error:", e);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!user ? (
        <>
          <Text>Login with Google</Text>
          <Button title="Sign in with Google" onPress={handleLogin} />
        </>
      ) : (
        <>
          <Text>Welcome, {user.displayName}</Text>
          {!!user.photoURL && (
            <Image
              source={{ uri: user.photoURL }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginTop: 10,
              }}
            />
          )}
          <Text>{user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
}

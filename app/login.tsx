// app/login.tsx
import React, { useEffect, useState } from "react";
import { Button, View, Text, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "expo-router";  // ✅ import router

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter(); // ✅ create router

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "941431420769-fa4v2jvbehe5lvj4sqmroa4e4aqqe702.apps.googleusercontent.com",
  });

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Handle Google login response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((err) =>
        console.error("Auth error:", err)
      );
    }
  }, [response]);

  // Logout handler
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("✅ User signed out");
        router.replace("/login"); // ✅ go back to login screen
      })
      .catch((err) => console.error("❌ Sign out error:", err));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!user ? (
        <>
          <Text>Login with Google</Text>
          <Button
            disabled={!request}
            title="Sign in with Google"
            onPress={() => promptAsync()}
          />
        </>
      ) : (
        <>
          <Text>Welcome, {user.displayName}</Text>
          {user.photoURL && (
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: 50, height: 50, borderRadius: 25, marginTop: 10 }}
            />
          )}
          <Text>{user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
}

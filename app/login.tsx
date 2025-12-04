// app/login.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  View,
  Text,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
} from "react-native";
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
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "941431420769-fa4v2jvbehe5lvj4sqmroa4e4aqqe702.apps.googleusercontent.com",
  });

  // Animation values for the card
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingSession(false);
    });
    return unsub;
  }, []);

  // Animate card on load AND on user change
  useEffect(() => {
    if (loadingSession) return;

    // reset animation
    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [loadingSession, user]);

  // Handle Google OAuth result
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      setAuthError(null);

      signInWithCredential(auth, credential)
        .catch((err) => {
          console.error("Auth error:", err);
          setAuthError("Failed to sign in. Please try again.");
        })
        .finally(() => setSigningIn(false));
    } else if (response) {
      setSigningIn(false);
      if (response.type !== "dismiss") {
        setAuthError("Sign-in was cancelled or blocked.");
      }
    }
  }, [response]);

  const handleLogin = () => {
    setAuthError(null);
    setSigningIn(true);
    promptAsync();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.replace("/login");
      })
      .catch(() => setAuthError("Failed to sign out. Please try again."));
  };

  // While restoring session
  if (loadingSession) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading session…</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Animated.View
        style={{
          width: 360,
          maxWidth: "90%",
          padding: 24,
          borderRadius: 20,
          backgroundColor: "#ffffff",

          // 🔥 upgraded card shadow
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          elevation: 12,

          alignItems: "center",

          // animations
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {!user ? (
          // ------------------ LOGIN CARD ------------------
          <>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              Welcome to Food Pantry App
            </Text>

            <Text
              style={{
                color: "#555",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Sign in with Google to start managing your pantry.
            </Text>

            <Button
              disabled={!request || signingIn}
              color="#27b33aff"
              title={
                !request
                  ? "Preparing sign-in…"
                  : signingIn
                  ? "Signing in…"
                  : "Sign in"
              }
              onPress={handleLogin}
            />

            {authError && (
              <View
                style={{
                  marginTop: 16,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  backgroundColor: "#ffe9ea",
                }}
              >
                <Text style={{ color: "#db193dff", textAlign: "center" }}>
                  {authError}
                </Text>
              </View>
            )}

            <Text
              style={{
                fontSize: 12,
                color: "#777",
                marginTop: 18,
                textAlign: "center",
              }}
            >
              By continuing, you agree to our terms and privacy policy.
            </Text>
          </>
        ) : (
          // ------------------ WELCOME BACK CARD ------------------
          <>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Welcome Back
            </Text>

            {user.photoURL && (
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

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              {user.displayName}
            </Text>

            <Text
              style={{
                color: "#444",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {user.email}
            </Text>

            <Button
              title="Go to Home"
              color="#27b33aff"
              onPress={() => router.replace("/screens/home")}
            />

            <View style={{ height: 10 }} />

            <Button title="Logout" color="#db193dff" onPress={handleLogout} />

            {authError && (
              <View
                style={{
                  marginTop: 16,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  backgroundColor: "#ffe9ea",
                }}
              >
                <Text style={{ color: "#db193dff", textAlign: "center" }}>
                  {authError}
                </Text>
              </View>
            )}
          </>
        )}
      </Animated.View>
    </View>
  );
}

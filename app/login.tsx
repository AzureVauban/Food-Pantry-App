// app/login.tsx
import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  Image,
  ActivityIndicator,
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

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingSession(false);
    });
    return unsubscribe;
  }, []);

  // Handle Google login response
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
        .finally(() => {
          setSigningIn(false);
        });
    } else if (response) {
      // cancelled / dismissed / error
      setSigningIn(false);
      if (response.type !== "dismiss") {
        setAuthError("Sign-in was cancelled or blocked.");
      }
    }
  }, [response]);

  // Login button handler
  const handleLogin = () => {
    if (!request) return;
    setAuthError(null);
    setSigningIn(true);
    // promptAsync triggers the Google flow
    promptAsync();
  };

  // Logout handler
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("✅ User signed out");
        setUser(null);
        router.replace("/login");
      })
      .catch((err) => {
        console.error("❌ Sign out error:", err);
        setAuthError("Failed to sign out. Please try again.");
      });
  };

  // While restoring existing session
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
      <View
        style={{
          width: 360,
          maxWidth: "90%",
          padding: 24,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
          alignItems: "center",
        }}
      >
        {!user ? (
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
              Sign in with Google to manage your pantry.
            </Text>

            <Button
              disabled={!request || signingIn}
              title={
                !request
                  ? "Preparing sign-in…"
                  : signingIn
                  ? "Signing in…"
                  : "Sign in with Google"
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
                <Text style={{ color: "#b00020", textAlign: "center" }}>
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
          <>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Welcome Back!
            </Text>
            {/* Profile picture */}
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
              onPress={() => router.replace("/screens/home")}
            />

            <View style={{ height: 10 }} />

            <Button color="#b00020" title="Logout" onPress={handleLogout} />

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
                <Text style={{ color: "#b00020", textAlign: "center" }}>
                  {authError}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

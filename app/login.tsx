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
  Pressable,
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

/* ---------------------------------------------------------
   HoverButton (Web-only hover + press animation)
--------------------------------------------------------- */
const HoverButton = ({
  children,
  scaleValue,
  width,
}: {
  children: React.ReactNode;
  scaleValue: Animated.Value;
  width?: number | string;
}) => {
  const hoverAnim = useRef(new Animated.Value(0)).current;

  const animateHover = (toValue: number) => {
    Animated.timing(hoverAnim, {
      toValue,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  // Build style WITHOUT undefined values
  const animatedStyle: any = {
    alignSelf: "center",
    transform: [
      {
        scale: Animated.multiply(
          scaleValue,
          hoverAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.03],
          })
        ),
      },
    ],
  };

  if (width !== undefined) {
    animatedStyle.width = width;
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onHoverIn={() => animateHover(1)}
        onHoverOut={() => animateHover(0)}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};


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

  /* ---------------------------------------------------------
     Animation Values
  --------------------------------------------------------- */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const loginButtonScale = useRef(new Animated.Value(1)).current;
  const homeButtonScale = useRef(new Animated.Value(1)).current;
  const logoutButtonScale = useRef(new Animated.Value(1)).current;

  const animatePress = (scale: Animated.Value, action: () => void) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.97,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(() => action());
  };

  /* ---------------------------------------------------------
     Firebase: Listen to auth state
  --------------------------------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingSession(false);
    });
    return unsub;
  }, []);

  /* ---------------------------------------------------------
     Animate card on load or user change
  --------------------------------------------------------- */
  useEffect(() => {
    if (loadingSession) return;

    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [loadingSession, user]);

  /* ---------------------------------------------------------
     Handle Google OAuth Result
  --------------------------------------------------------- */
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      setAuthError(null);

      signInWithCredential(auth, credential)
        .catch(() => setAuthError("Failed to sign in. Please try again."))
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

  /* ---------------------------------------------------------
     Loading screen
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     Main UI
  --------------------------------------------------------- */
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

          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          elevation: 12,

          alignItems: "center",

          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {!user ? (
          /* ---------------------------------------------------------
             LOGIN CARD
          --------------------------------------------------------- */
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

            <HoverButton
              scaleValue={loginButtonScale}
              width={signingIn ? "35%" : "25%"}
            >
              <Button
                disabled={!request || signingIn}
                color="#27b33aff"
                title={
                  !request
                    ? "Preparing…"
                    : signingIn
                    ? "Signing in…"
                    : "Sign In"
                }
                onPress={() => {
                  if (!request || signingIn) return;
                  animatePress(loginButtonScale, handleLogin);
                }}
              />
            </HoverButton>

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
          /* ---------------------------------------------------------
             WELCOME BACK CARD
          --------------------------------------------------------- */
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

            <HoverButton scaleValue={homeButtonScale} width="34%">
              <Button
                title="Go to Home"
                color="#27b33aff"
                onPress={() =>
                  animatePress(homeButtonScale, () =>
                    router.replace("/screens/home")
                  )
                }
              />
            </HoverButton>

            <View style={{ height: 10 }} />

            <HoverButton scaleValue={logoutButtonScale} width="24%">
              <Button
                title="Logout"
                color="#db193dff"
                onPress={() => animatePress(logoutButtonScale, handleLogout)}
              />
            </HoverButton>

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

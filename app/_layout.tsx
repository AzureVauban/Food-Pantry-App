import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  const [user, setUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false); // <- was "loading"

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("[layout] onAuthStateChanged ->", u?.uid || "no user");
      setUser(u);
      setAuthResolved(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!authResolved) return; // wait until Firebase finished restoring session
    const onLoginPage = segments[0] === "login";

    if (!user && !onLoginPage) {
        router.replace("/login");
    } else if (user && onLoginPage) {
        router.replace("/");
    }
  }, [user, authResolved, segments, router]);

  if (!authResolved) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}

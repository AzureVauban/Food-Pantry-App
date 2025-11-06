// app/login.tsx
import React, { useEffect, useState } from 'react';
import {
  Button,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, persistenceReady } from '../firebase/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Expo AuthSession Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '941431420769-fa4v2jvbehe5lvj4sqmroa4e4aqqe702.apps.googleusercontent.com',
  });

  // Ensure persistence is ready (web => local, native => memory)
  useEffect(() => {
    persistenceReady.finally(() => {
      // no-op; just ensure it ran before we try to sign in
      console.log('[login] persistence ready');
    });
  }, []);

  // Track auth state for UI only (NO navigation here)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Handle Google OAuth result and navigate on successful sign-in
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          console.log('✅ Signed in successfully');
          router.replace('/screens/home'); // navigate ONLY here
        })
        .catch((err) => {
          console.error('❌ Auth error:', err);
          Alert.alert('Login Error', err.message || 'Failed to sign in');
        });
    } else if (response?.type === 'error') {
      Alert.alert('Login Cancelled', 'You cancelled the sign-in process.');
    }
  }, [response, router]);

  // Optional: local logout button for testing on this screen
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.replace('/login');
      })
      .catch((err) => {
        console.error('❌ Sign out error:', err);
        Alert.alert('Logout Error', err.message || 'Failed to sign out');
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading session...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

          {/* useful during testing; optional to keep */}
          <Button title="Logout" onPress={handleLogout} />
          <Button
            title="Go to Home"
            onPress={() => router.replace('/screens/home')}
          />
        </>
      )}
    </View>
  );
}

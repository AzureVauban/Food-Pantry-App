import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
  setPersistence,
  inMemoryPersistence,
  User,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '941431420769-fa4v2jvbehe5lvj4sqmroa4e4aqqe702.apps.googleusercontent.com',
  });

  // Persist auth session explicitly (optional for React Native)
  useEffect(() => {
    setPersistence(auth, inMemoryPersistence).catch((err) => {
      console.warn('Persistence setup failed', err);
    });
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Handle Google login response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log('✅ Signed in successfully');
        })
        .catch((err) => {
          console.error('Auth error:', err);
          Alert.alert('Login Error', err.message || 'Failed to sign in');
        });
    } else if (response?.type === 'error') {
      Alert.alert('Login Cancelled', 'You cancelled the sign-in process.');
    }
  }, [response]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('✅ User signed out');
        setUser(null);
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
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!user ? (
        <>
          <Text>Login with Google</Text>
          <Button disabled={!request} title="Sign in with Google" onPress={() => promptAsync()} />
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
          <Button title="Go to Home" onPress={() => router.replace('/')} />
        </>
      )}
    </View>
  );
}

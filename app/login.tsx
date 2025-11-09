// app/login.tsx
import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
//import firebase from '@react-native-firebase/app';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // ✅ Use proper FirebaseAuthTypes instead of firebase.User
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '941431420769-fa4v2jvbehe5lvj4sqmroa4e4aqqe702.apps.googleusercontent.com',
  });

  // ✅ Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // ✅ Handle Google sign-in result
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = auth.GoogleAuthProvider.credential(id_token);
      auth()
        .signInWithCredential(credential)
        .catch((err) => console.error('Auth error:', err));
    }
  }, [response]);

  // ✅ Logout handler
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('✅ User signed out');
        router.replace('/login');
      })
      .catch((err) => console.error('❌ Sign out error:', err));
  };

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
          <Button
            title="Go to Home"
            onPress={() => router.replace('/screens/home')}
          />
        </>
      )}
    </View>
  );
}
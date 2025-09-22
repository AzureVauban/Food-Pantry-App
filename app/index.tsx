import { Link } from "expo-router";
import { View, Text, Button } from "react-native";


export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Food Inventory App</Text>
      <Link href="/login" asChild>
        <Button title="Go to Login" />
      </Link>
    </View>
  );
}

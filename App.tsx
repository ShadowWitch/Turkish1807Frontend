import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { BottomTabNavigator } from "./src/navigator/BottomTabNavigator";
import { Background } from "./src/components/Background";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <BottomTabNavigator />
        {/* <StackNavigator /> */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

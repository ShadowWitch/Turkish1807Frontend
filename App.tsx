import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { BottomTabNavigator } from "./src/navigator/BottomTabNavigator";
import { Background } from "./src/components/Background";
import { AuthScreen } from "./src/screens/AuthScreen";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useAuth } from "./src/context/AuthContext";
import { LoadingAuth } from "./src/screens/LoadingAuth";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" backgroundColor="white" />
        <NavigationContainer>
          {/* {!isAuthenticated ? <LoadingAuth /> : <BottomTabNavigator />} */}
          {/* <BottomTabNavigator /> */}
          <StackNavigator />
        </NavigationContainer>
      </QueryClientProvider>
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

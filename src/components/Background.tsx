import React from "react";
import { View, StyleSheet } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const Background = ({ children }: { children: any }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ ...styleBackground.background, marginTop: top + 5 }}>
      {children}
    </View>
  );
};

const styleBackground = StyleSheet.create({
  background: {
    backgroundColor: "#16213E",
    flex: 1,
  },
});

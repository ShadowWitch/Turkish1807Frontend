import React from "react";

import { View, Text, ActivityIndicator } from "react-native";
export const LoadingScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
      <Text>Cargando</Text>
    </View>
  );
};

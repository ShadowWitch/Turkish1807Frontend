import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { checkAuth } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const LoadingAuth = () => {
  const navigation = useNavigation();

  const onCheck = async () => {
    const token = await AsyncStorage.getItem("token");

    const resp = await checkAuth(token);

    if (!resp) navigation.navigate("AuthScreen");
  };
  useEffect(() => {
    onCheck();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "red",
        flex: 1,
      }}
    >
      <Text>Cargando...</Text>
    </View>
  );
};

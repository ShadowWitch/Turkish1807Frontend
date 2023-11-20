// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Pressable,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// import { COLORES, COLOR_PRIMARIO } from "../styles/Styles";
// import { Container } from "./Container";
// import { isTablet } from "react-native-device-info";

const HEIGHT = 256;

interface Props {
  options: {
    id: number;
    value: string | number;
    label: string;
  }[];
  label: string;
  error?: {
    message: string;
  };
  value: {
    id: number;
    value: string | number;
    label: string;
  };
  placeholder?: string;
  onChange: (item: any) => void;
}

export const SelectInput = ({
  options,
  label,
  error,
  value,
  placeholder = "Seleccione una opción",
  onChange = () => {
    return;
  },
}: Props) => {
  const [dropdown, setDropdown] = useState(false);

  //   const getChevronColor = () => {
  //     if (textColor === "text-aba-500") return COLOR_PRIMARIO;
  //     const [, color, opacity] = textColor.split("-");
  //     return COLORES[color][opacity];
  //   };

  const animatedvalue = React.useRef(new Animated.Value(0)).current;

  const slidedown = () => {
    setDropdown(true);
    Animated.timing(animatedvalue, {
      toValue: HEIGHT,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  const renderSelectOptions = ({
    item,
  }: {
    item: { label: string; id: number; value: string | number };
  }) => (
    <Pressable
      onPress={() => {
        slideup();
        onChange(item);
      }}
    >
      {({ pressed }) => (
        <View
          //   className={`p-1 m-1 mx-0 border-2 border-stone-600 rounded-md ${
          //     value && value.id === item.id ? "border-aba-500" : ""
          //   }`}
          //   width={isTablet() ? 432 : 244}
          style={{
            shadowColor: "#000",
            elevation: pressed ? 0 : 2,
            width: 244,
          }}
        >
          <Text>{item.label}</Text>
        </View>
      )}
    </Pressable>
  );

  const Dropdown = (
    <Animated.View
      //   className="rounded-3xl"
      style={{
        maxHeight: animatedvalue,
      }}
    >
      <View
        // className={`bg-white p-0 pl-2 pr-1 border-2 border-stone-600`}
        style={{
          shadowColor: "#000",
          elevation: 5,
          alignItems: "center",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator
            data={options}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingRight: 4,
              paddingVertical: 8,
            }}
            keyboardShouldPersistTaps="handled"
            renderItem={renderSelectOptions}
          />
        </ScrollView>
      </View>
    </Animated.View>
  );

  return (
    <View>
      {label && <Text>{label}</Text>}
      <Pressable
        onPress={() => {
          dropdown ? slideup() : slidedown();
        }}
      >
        <View>
          <Text
            // className={`flex-1 text-base font-medium ${textColor} ${
            //   value ? "font-bold" : "text-stone-500 "
            // }`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {value ? value.label : placeholder}
          </Text>
          <View>
            {/* <FontAwesomeIcon
              icon={dropdown ? "chevron-up" : "chevron-down"}
              size={16}
              color={getChevronColor()}
            /> */}

            <Ionicons name={"arrow-down"} size={20} color={"red"} />
          </View>
        </View>
      </Pressable>

      {dropdown ? Dropdown : null}

      {error?.message && <Text>{error.message}</Text>}
    </View>
  );
};

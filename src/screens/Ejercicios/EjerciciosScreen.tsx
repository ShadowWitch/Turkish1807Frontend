import React from "react";
import {
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { Background } from "../../components/Background";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { ImagePickerComponent } from "../../components/ImagePickerComponent";
import { FormCrearEjercicio } from "../../components/forms/FormCrearEjercicio";

export const EjerciciosScreen = () => {
  const { height, width } = useWindowDimensions();

  return (
    <Background>
      <FormCrearEjercicio />
    </Background>
  );
};

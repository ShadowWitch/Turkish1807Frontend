import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  LogBox,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  width: number;
}

LogBox.ignoreAllLogs(true);

export const ImagePickerComponent = ({ width = 10 }: Props) => {
  const [image, setImage] = useState<null | string>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Desea agregar una imagen (opcional)
      </Text>

      <TouchableOpacity onPress={() => pickImage()} activeOpacity={0.7}>
        <Text
          style={{
            color: "white",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Cargar imagen...
        </Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
          }}
        />
      )}
    </View>
  );
};

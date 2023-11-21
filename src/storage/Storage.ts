import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveStorage = async ({
  key,
  data,
}: {
  key: string;
  data: string;
}) => {
  try {
    await AsyncStorage.setItem(key, data);
    console.log("Save localStorage");
  } catch (error) {
    console.log(error);
  }
};

export const GetTokenStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) return "";

    return token;
  } catch (error) {
    console.log(error);
  }
};

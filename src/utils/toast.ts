import Toast from "react-native-toast-message";
import { ToastAndroid } from "react-native";

type ToastType = "success" | "error" | "info";

interface ToastParams {
  type: ToastType;
  title: string;
  description: string;
}

export const CreateToast = ({ type, title, description }: ToastParams) => {
  Toast.show({
    type: type,
    text1: title,
    text2: description,
  });
};

export const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showToastLong = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );

  // Cerrar el Toast después de 3 segundos
  // setTimeout(() => {
  //   ToastAndroid
  // }, 3000);
};

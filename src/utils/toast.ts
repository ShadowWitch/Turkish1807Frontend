import Toast from "react-native-toast-message";

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

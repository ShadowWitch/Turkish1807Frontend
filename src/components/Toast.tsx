import { StyleSheet, View } from "react-native";
import { BaseToast } from "react-native-toast-message";

export const Toast = () => {
  const numberOfLinesForToastr = 10;

  const toastConfig = {
    success: () => (
      <BaseToast
        // {...props}
        style={styleToastSuccess.styleBackground}
        text1Style={styleToastSuccess.styleTitle}
        text2Style={styleToastSuccess.styleDescription}
        text2NumberOfLines={numberOfLinesForToastr}
        // renderLeadingIcon={() => <Status status={true} size={30} />}
      />
    ),

    error: () => (
      <BaseToast
        // {...props}
        style={styleToastError.styleBackground}
        text1Style={styleToastError.styleTitle}
        text2Style={styleToastError.styleDescription}
        text2NumberOfLines={numberOfLinesForToastr}
        // renderLeadingIcon={() => <Status status={false} size={30} />}
      />
    ),
  };

  return (
    <>
      <View style={styleToastContainer.style}>
        <Toast config={toastConfig} />
      </View>
    </>
  );
};

const styleText = {
  styleTextForTitles: 15,
  styleTextForDescriptions: 15,
};

const styleToastContainer = StyleSheet.create({
  style: {
    zIndex: 1,
  },
});

const styleToastError = StyleSheet.create({
  styleBackground: {
    // backgroundColor: COLORES.red[100],
    backgroundColor: "red",
    height: 120,
    display: "flex",
    alignItems: "center",
    padding: 16,
    // borderColor: COLORES.red[600],
    borderWidth: 2,
  },

  styleTitle: {
    fontSize: styleText.styleTextForTitles,
  },

  styleDescription: {
    fontSize: styleText.styleTextForDescriptions,
    color: "black",
  },
});

const styleToastSuccess = StyleSheet.create({
  styleBackground: {
    // backgroundColor: COLORES.green[100],
    backgroundColor: "green",
    height: 100,
    display: "flex",
    alignItems: "center",
    padding: 16,
    // borderColor: COLORES.green[600],
    borderWidth: 2,
  },

  styleTitle: {
    fontSize: styleText.styleTextForTitles,
  },

  styleDescription: {
    fontSize: styleText.styleTextForDescriptions,
    color: "black",
  },
});

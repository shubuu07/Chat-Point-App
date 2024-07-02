import { Platform, ToastAndroid } from "react-native";
import Snackbar from "react-native-snackbar";
import { COLORS, FONTS } from "../constants/theme";

const PriceFormater = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price / 1)
}

export const snackbarToast = ({ text, type }) => {
  const message = text || (type === "success" ? "Success" : type === "error" ? "Something went wrong" : "");
  const backgroundColor = type === "success" ? COLORS.primary : type === "error" ? COLORS.red : COLORS.default;

  return Platform.OS === "ios" ?
    Snackbar.show({
      text: message,
      textColor: "#fff",
      backgroundColor: backgroundColor,
      ...FONTS.ftBold
    }) : ToastAndroid.show(message, ToastAndroid.SHORT);
}

export default PriceFormater    
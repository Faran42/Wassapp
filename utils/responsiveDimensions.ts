import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

//return height * percentage, or current window height
export function hp(percentage?: number) {
  return percentage ? height * (percentage / 100) : height;
}

//return width * percentage, or current window width
export function wp(percentage?: number) {
  return percentage ? width * (percentage / 100) : width;
}

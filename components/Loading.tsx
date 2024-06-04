import LottieView from "lottie-react-native";
import { View, Text } from "react-native";

import { hp } from "~/utils/responsiveDimensions";

export default function Loading({ size }: { size: number }) {
  return (
    <View style={{ height: size }}>
      <LottieView
        style={{ height: size, width: size }}
        source={require("../assets/loading.json")}
        autoPlay
        loop
        resizeMode="cover"
      />
    </View>
  );
}

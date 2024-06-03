import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import "../global.css";

//força a rota incial
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(tabs)",
// };

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //   <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    // </Stack>
    <>
      <StatusBar translucent />
      <View className="flex-1">
        <Slot />
      </View>
    </>
  );
}

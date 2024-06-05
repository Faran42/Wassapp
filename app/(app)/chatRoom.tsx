import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatRoom() {
  //useLocalSearchParams return data from route params
  const item = useLocalSearchParams();
  console.log("got item data: ", item);
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  );
}

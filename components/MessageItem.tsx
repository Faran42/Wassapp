import { Text, View } from "react-native";

import { hp, wp } from "~/utils/responsiveDimensions";

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId == message?.userId) {
    // my message

    return (
      <View className="mb-3 mr-3 flex-row justify-end">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end rounded-2xl border border-neutral-200 bg-white p-3">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: wp(80) }} className="mb-3 ml-3">
      <View className="flex self-start rounded-2xl border border-indigo-200 bg-indigo-100 p-3 px-4">
        <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
      </View>
    </View>
  );
}

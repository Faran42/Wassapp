import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { blurhash } from "~/utils/common";
import { hp } from "~/utils/responsiveDimensions";

export default function ChatItem({ noBorder, router, item }) {
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`mx-4 mb-4 flex-row items-center justify-between gap-3  pb-2 ${noBorder ? "" : " border-b border-b-neutral-200 "}`}
    >
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={{ uri: item?.profileUrl }}
        placeholder={blurhash}
        transition={1000}
      />

      {/* name and last message */}

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-semibold text-neutral-800"
          >
            Time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          última mensagem
        </Text>
      </View>
    </TouchableOpacity>
  );
}

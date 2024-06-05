import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import ChatRoomHeader from "~/components/ChatRoomHeader";
import CustomKeyBoardView from "~/components/CustomKeyboardView";
import MessagesList from "~/components/MessagesList";
import { hp } from "~/utils/responsiveDimensions";

export default function ChatRoom() {
  //useLocalSearchParams return data from route params
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  return (
    <CustomKeyBoardView inChat>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between overflow-visible bg-neutral-300">
          <View className="flex-1">
            <MessagesList messages={messages} />
          </View>
          <View style={{ marginBottom: hp(1.7) }} className="pt-2">
            <View className="mx-3 flex-row justify-between rounded-full border border-neutral-300 bg-white p-2 pl-5">
              <TextInput
                style={{ fontSize: hp(2) }}
                className="mr-2 flex-1"
                placeholder="Digite a mensagem..."
              />
              <TouchableOpacity className="mr-[1px] rounded-full bg-neutral-200 p-2">
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}

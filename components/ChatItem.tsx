import { Image } from "expo-image";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { blurhash, formatDate, getRoomId } from "~/utils/common";
import { db } from "~/utils/firebase";
import { hp } from "~/utils/responsiveDimensions";

export default function ChatItem({ noBorder, router, item, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    const roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage) {
      const date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
    return "Time";
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") {
      return "Loading...";
    }
    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId) {
        return "Você: " + lastMessage?.text;
      }
      return lastMessage?.text;
    } else {
      return "Diga oi 👋";
    }
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
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

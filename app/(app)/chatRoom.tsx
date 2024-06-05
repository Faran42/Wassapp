import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ChatRoomHeader from "~/components/ChatRoomHeader";
import CustomKeyBoardView from "~/components/CustomKeyboardView";
import MessagesList from "~/components/MessagesList";
import { useAuth } from "~/context/authContext";
import { getRoomId } from "~/utils/common";
import { db } from "~/utils/firebase";
import { hp } from "~/utils/responsiveDimensions";

export default function ChatRoom() {
  //useLocalSearchParams return data from route params
  const item = useLocalSearchParams(); //second user
  const { user } = useAuth(); // logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef(null);

  const handleSendMessage = async () => {
    const message = textRef.current.trim();
    if (!message) return;
    try {
      const roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef.current.clear();

      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (e) {
      Alert.alert(
        "Erro na mensagem",
        "Ocorreu um erro ao enviar a mensagem. ",
        e.message
      );
    }
  };

  const createRoomIfNotExists = async () => {
    const roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    createRoomIfNotExists();

    const roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      KeyboardDidShowListener.remove();
      unsub();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  return (
    <CustomKeyBoardView inChat>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between overflow-visible bg-neutral-300">
          <View className="flex-1">
            <MessagesList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={{ marginBottom: hp(1.7) }} className="pt-2">
            <View className="mx-3 flex-row justify-between rounded-full border border-neutral-300 bg-white p-2 pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="mr-2 flex-1"
                placeholder="Digite a mensagem..."
                onSubmitEditing={handleSendMessage}
                clearTextOnFocus
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="mr-[1px] rounded-full bg-neutral-200 p-2"
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}

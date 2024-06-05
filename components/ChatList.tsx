import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

import ChatItem from "./ChatItem";

export default function ChatList({ users, currentUser }) {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={users}
        contentContainerStyle={{ paddingVertical: 25 }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            router={router}
            item={item}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
}

import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import ChatList from "~/components/ChatList";
import Loading from "~/components/Loading";
import { useAuth } from "~/context/authContext";
import { UserProps } from "~/interfaces/AuthContext";
import { usersRef } from "~/utils/firebase";
import { hp } from "~/utils/responsiveDimensions";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    const data: UserProps[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    console.log("got users: ", data);

    setUsers(data);
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />

      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(8)} />
        </View>
      )}
    </View>
  );
}

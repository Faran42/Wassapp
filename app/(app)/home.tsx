import { Button, Text, View } from "react-native";

import { useAuth } from "~/context/authContext";

export default function Home() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  console.log("user data", user);

  return (
    <View>
      <Text>Home</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

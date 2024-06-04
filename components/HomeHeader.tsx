import { AntDesign, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Platform, Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomMenuItem from "./CustomMenuItem";
import Divider from "./Divider";

import { useAuth } from "~/context/authContext";
import { blurhash } from "~/utils/common";
import { hp } from "~/utils/responsiveDimensions";

const ios = Platform.OS === "ios";

export default function HomeHeader() {
  const { user, logout } = useAuth();

  const { top } = useSafeAreaInsets();

  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between rounded-b-3xl bg-indigo-400 px-5 pb-6 shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Conversas
        </Text>
      </View>

      <View>
        <View>
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  // style
                },
              }}
            >
              <Image
                style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                source={user?.profileUrl}
                placeholder={blurhash}
                transition={500}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderRadius: 10,
                  borderCurve: "continuous",
                  marginTop: 40,
                  marginLeft: -10,
                  backgroundColor: "white",
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 0 },
                  width: 150,
                },
              }}
            >
              <CustomMenuItem
                text="Perfil"
                action={handleProfile}
                value={null}
                icon={<Feather name="user" size={hp(2.7)} color="#737373" />}
              />
              <Divider />
              <CustomMenuItem
                text="Sair"
                action={handleLogout}
                value={null}
                icon={
                  <AntDesign name="logout" size={hp(2.4)} color="#AA0000" />
                }
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
}

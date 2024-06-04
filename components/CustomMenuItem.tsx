import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";

import { hp } from "~/utils/responsiveDimensions";

export default function CustomMenuItem({ text, action, value, icon }) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="flex-row items-center justify-between px-4 py-1">
        <Text
          style={{ fontSize: hp(2) }}
          className="to-neutral-600 font-semibold"
        >
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
}

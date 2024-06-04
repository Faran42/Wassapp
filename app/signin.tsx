import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Loading from "~/components/Loading";
import { hp, wp } from "~/utils/responsiveDimensions";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12">
        {/* signIn image */}
        <View className="items-center">
          <Image
            style={{
              height: hp(25),
              width: wp(50),
            }}
            resizeMode="center"
            source={require("../assets/login.png")}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="text-center font-bold tracking-wider text-neutral-800">
            Login
          </Text>

          {/* inputs */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 rounded-2xl bg-neutral-100 px-4">
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor="gray"
              />
            </View>
            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row items-center gap-4 rounded-2xl bg-neutral-100 px-4">
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="text-right font-semibold text-neutral-500">
                Esqueceu a senha?
              </Text>
            </View>

            {/* submit button */}
            <View>
              {isLoading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(6.5) }}
                  className="items-center justify-center rounded-xl bg-indigo-500">
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="font-bold tracking-wider text-white">
                    Entrar
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500">
                Ainda não tem uma conta?{" "}
              </Text>
              <Pressable onPress={() => router.push("signup")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500">
                  Cadastrar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

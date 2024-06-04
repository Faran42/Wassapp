import { Feather, Octicons } from "@expo/vector-icons";
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

import CustomKeyBoardView from "~/components/CustomKeyboardView";
import Loading from "~/components/Loading";
import { useAuth } from "~/context/authContext";
import { hp, wp } from "~/utils/responsiveDimensions";

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const usernamedRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileUrlRef = useRef("");

  const handleRegister = async () => {
    if (
      !usernamedRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !profileUrlRef.current
    ) {
      Alert.alert("Cadastro", "Por favor, preencha todos os campos.");
    }

    setIsLoading(true);

    const response = await register(
      usernamedRef.current,
      emailRef.current,
      passwordRef.current,
      profileUrlRef.current
    );

    setIsLoading(false);

    // console.log("got result: ", response);
    if (!response.success) {
      Alert.alert("Cadastro", response.msg);
    }
  };

  return (
    <CustomKeyBoardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/* signIn image */}
        <View className="items-center">
          <Image
            style={{
              height: hp(25),
              width: wp(50),
            }}
            resizeMode="center"
            source={require("../assets/register.png")}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="text-center font-bold tracking-wider text-neutral-800"
          >
            Cadastre sua conta
          </Text>

          {/* inputs */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 rounded-2xl bg-neutral-100 px-4"
            >
              <View style={{ width: wp(6) }} className="mr-1 items-center">
                <Feather name="user" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (usernamedRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Nome de usuário"
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 rounded-2xl bg-neutral-100 px-4"
            >
              <View style={{ width: wp(6) }} className="mr-1 items-center">
                <Octicons name="mail" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Endereço de email"
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 rounded-2xl bg-neutral-100 px-4"
            >
              <View style={{ width: wp(6) }} className="mr-1 items-center">
                <Octicons name="lock" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Senha"
                placeholderTextColor="gray"
                secureTextEntry
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 rounded-2xl bg-neutral-100 px-4"
            >
              <View style={{ width: wp(6) }} className="mr-1 items-center">
                <Feather name="image" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (profileUrlRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="URL do perfil"
                placeholderTextColor="gray"
              />
            </View>

            {/* submit button */}
            <View>
              {isLoading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{ height: hp(6.5) }}
                  className="items-center justify-center rounded-xl bg-indigo-500"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="font-bold tracking-wider text-white"
                  >
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Já tem uma conta?{" "}
              </Text>
              <Pressable onPress={() => router.replace("signin")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Logar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}

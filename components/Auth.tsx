import React, { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Image, Input } from "react-native-elements";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { applyUser } from "../lib/stores/userSlice";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  // const message = ""

  async function signInWithEmail() {
    if (email === "" || password === "") {
      Alert.alert("Bitte Email und Passwort eingeben!");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    // console.log("userData", data.user?.id);

    const userData = await supabase
      .from("profiles")
      .select()
      .eq("id", data.user?.id as any);
    // console.log("userData", userData);

    dispatch(
      applyUser({
        id: userData.data![0].id,
        updated_at: userData.data![0].updated_at,
        username: userData.data![0].username,
        full_name: userData.data![0].full_name,
        household: userData.data![0].household,
        avatar_url: null,
      })
    );
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (email === "" || password === "") {
      Alert.alert("Bitte Email und Passwort eingeben!");
      return;
    }
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log("Session", session);
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View className="flex items-center w-full h-full p-3 mt-11">
      <Image
        className="h-48 w-48 object-contain rounded-[50px]"
        source={require("../assets/images/Logo.png")}
      />
      <Text className="mb-12 text-4xl font-bold text-white ">HappyHome</Text>
      <View>
        <View className="py-4 w-[80vw]">
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            className="text-white"
          />
        </View>
        <View className="py-4 w-[80vw]">
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
            className="text-white"
          />
        </View>
        <View className="py-4 w-[80vw]">
          <Button
            title="Einloggen"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View className="py-4 w-[80vw]">
          <Button
            title="Registrieren"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      </View>
    </View>
  );
}

let asd = {
  app_metadata: { provider: "email", providers: ["email"] },
  aud: "authenticated",
  confirmed_at: "2023-11-19T13:20:45.4414Z",
  created_at: "2023-11-19T13:20:45.435381Z",
  email: "dan_weber_main@outlook.com",
  email_confirmed_at: "2023-11-19T13:20:45.4414Z",
  id: "2b722827-8598-48de-bdc3-92a60f349b12",
  identities: [
    {
      created_at: "2023-11-19T13:20:45.439999Z",
      id: "2b722827-8598-48de-bdc3-92a60f349b12",
      identity_data: [Object],
      last_sign_in_at: "2023-11-19T13:20:45.439955Z",
      provider: "email",
      updated_at: "2023-11-19T13:20:45.439999Z",
      user_id: "2b722827-8598-48de-bdc3-92a60f349b12",
    },
  ],
  last_sign_in_at: "2023-11-24T21:48:02.996212224Z",
  phone: "",
  role: "authenticated",
  updated_at: "2023-11-24T21:48:02.997742Z",
  user_metadata: {},
};

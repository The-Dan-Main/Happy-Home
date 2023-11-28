import { View } from "../../components/Themed";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Auth from "../../components/Auth";
import { Session } from "@supabase/supabase-js";
import { Button, Text } from "react-native-elements";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { showUser, fetchUserAsync } from "../../lib/stores/userSlice";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  // const [user, setUser] = useState<Session | null>(null);

  let userName = useAppSelector((state) => state.user.username);
  let user = useAppSelector((state) => state.user);
  const items = useAppSelector((state) => state.menu);
  // console.log("items", items);

  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    dispatch(fetchUserAsync());
  }, []);

  return (
    <View className="items-center justify-center flex-1 ">
      {session ? (
        <View>
          <Text className="text-xl font-bold text-white">Home Screen</Text>
          <Text className="text-white">
            {userName ? `Wilkommen, ${userName}` : "noch nicht eingeloggt"}
          </Text>
          <View
            className=" my-8 h-[1px] w-[80%]"
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View className="flex flex-col mb-6">
            <Button
              className="block p-4 text-white"
              onPress={() => dispatch(showUser())}
              title="Log User"
            ></Button>
          </View>
          <Button
            className="block p-4 mt-4 text-white"
            onPress={() => dispatch(fetchUserAsync())}
            title="Fetch User"
          ></Button>
        </View>
      ) : (
        <Auth />
      )}
    </View>
  );
}

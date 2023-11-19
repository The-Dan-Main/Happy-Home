import { View } from "../../components/Themed";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Auth from "../../components/Auth";
import { Session } from "@supabase/supabase-js";
import { Text } from "react-native-elements";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View className=" flex-1 items-center justify-center ">
      {session && session.user ? (
        <>
          <Text className=" text-xl text-white font-bold">Home Screen</Text>
          <View
            className=" my-8 h-[1px] w-[80%]"
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </>
      ) : (
        <Auth />
      )}
    </View>
  );
}

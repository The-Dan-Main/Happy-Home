import { View } from "../../components/Themed";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Auth from "../../components/Auth";
import { Session } from "@supabase/supabase-js";
import { Text } from "react-native-elements";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    if (session && session.user) {
      const fetchUser = async (session: any) => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", session.user?.id);
        console.log("data", data);
        // console.log("error", error);
      };
      fetchUser(session);
      const fetchHousehold = async (session: any) => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", session.user?.id);
        console.log("data", data);
        // console.log("error", error);
      };
      fetchHousehold(session);
    }
    // console.log("session", session);
  }, []);

  return (
    <View className="items-center justify-center flex-1 ">
      {session && session.user ? (
        <>
          <Text className="text-xl font-bold text-white">Home Screen</Text>
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

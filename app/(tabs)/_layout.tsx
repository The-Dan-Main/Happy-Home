import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Drawer } from "expo-router/drawer";

import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Text } from "react-native-elements";

export default function TabLayout() {
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
    <Drawer
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerStyle: { display: session && session.user ? "flex" : "none" },
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome name="home" width={40} size={30} color={color} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="shoppingList"
        options={{
          drawerLabel: "Einkaufliste",
          title: "Einkaufliste",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome
                name="shopping-basket"
                width={40}
                size={30}
                color={color}
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name="finance"
        options={{
          drawerLabel: "Finanzen",
          title: "Finanzen",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome
                name="credit-card"
                width={40}
                size={30}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="tasks"
        options={{
          drawerLabel: "Ämtli",
          title: "Ämtli",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome name="bath" width={40} size={30} color={color} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="menu"
        options={{
          drawerLabel: "Wunschliste",
          title: "Wunschliste",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome name="cutlery" width={40} size={30} color={color} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerStyle: { display: session && session.user ? "flex" : "none" },
          drawerLabel: "Account",
          title: "Account",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome name="user" width={40} size={30} color={color} />
            );
          },
        }}
      />
    </Drawer>
  );
}

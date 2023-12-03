import { Tabs } from "expo-router/tabs";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";

export default function AppLayout() {
  return <Stack />;
}

// import { Tabs } from "expo-router/tabs";
// import React from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";

// export default function AppLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Übersicht",
//           tabBarActiveTintColor: "white",
//           tabBarInactiveTintColor: "gray",
//           headerShown: false,
//           tabBarShowLabel: false,
//         //   href: null,
//           tabBarIcon: () => <FontAwesome name="credit-card" size={24} color="white" />,
//         }}
//       />
//       <Tabs.Screen
//         name="addItems"
//         options={{
//           title: "Hinzufügen",
//           headerShown: false,
//           tabBarActiveTintColor: "white",
//           tabBarInactiveTintColor: "gray",
//           tabBarIcon: () => <FontAwesome name="plus" size={24} color="white" />,
//         }}
//       />
//     </Tabs>
//   );
// }

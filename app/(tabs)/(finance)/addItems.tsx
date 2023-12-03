import { Button, Input } from "react-native-elements";
import { Stack } from "expo-router";
import { Text, View } from "../../../components/Themed";
import React, { JSXElementConstructor, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import {
  addItemAsync,
  deleteItemAsync,
  fetchItemsAsync,
} from "../../../lib/stores/financeSlice";
import { Keyboard, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScrollPicker from "react-native-wheel-scrollview-picker";

export default () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Vorspeise");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("Titel*");

  const id = useAppSelector((state) => state.user.id);
  const household = useAppSelector((state) => state.user.household);
  const items = useAppSelector((state) => state.finance.items);
  const dispatch = useAppDispatch();
  const itemsOutput: any = [];
  for (const item of items) {
    if (item !== null) {
      // console.log("item", item);
      itemsOutput.push(
        <View key={item.id} className="w-5/6 p-4 m-4 bg-slate-800 rounded-2xl">
          <Text className="text-xl text-white">{item.title}</Text>
          <Text className="text-sm text-white">{item.description}</Text>
          {/* <View > */}
          <Text className="absolute top-0 text-right text-slate-400 right-12">
            {item.category}
          </Text>
          {/* </View> */}
          <View className="absolute bg-transparent right-3 top-1">
            <Pressable
              className="bg-transparent"
              onPress={() => dispatch(deleteItemAsync(item.id))}
            >
              <Text className="text-2xl text-white bg-transparent">X</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  }
  // console.log("itemsOutput", itemsOutput);

  useEffect(() => {
    dispatch(fetchItemsAsync());
    // console.log("fetchItemsAsync");
  }, [dispatch]);

  useEffect(() => {
    setTitle("");
    setDescription("");
    Keyboard.dismiss();
  }, [items]);

  return (
    <View className="w-full h-full">
      <Stack.Screen
        options={{
          title: "Finanzeintrag hinzufügen",
        }}
      />
      <ScrollView className=" mb-[25%]">
        <Text>Hier kannst du bald Items hinzufügen</Text>
      </ScrollView>
    </View>
  );
};

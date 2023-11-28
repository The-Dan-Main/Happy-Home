import { Button, Input } from "react-native-elements";
import { Text, View } from "../../components/Themed";
import React, { JSXElementConstructor, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { addItemAsync, deleteItemAsync, fetchItemsAsync } from "../../lib/stores/menuSlice";
import { Keyboard, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const id = useAppSelector((state) => state.user.id);
  const household = useAppSelector((state) => state.user.household);
  const items = useAppSelector((state) => state.menu.items);
  const dispatch = useAppDispatch();
  const itemsOutput: any = [];
  for (const item of items) {
    if (item !== null) {
      // console.log("item", item);
      itemsOutput.push(
        <View key={item.id} className="w-5/6 p-4 m-4 bg-slate-800 rounded-2xl">
          <Text className="text-white">{item.title}</Text>
          <Text className="text-sm text-white">{item.description}</Text>
          <View className="absolute bg-transparent right-3 top-1">
            <Pressable className="bg-transparent" onPress={()=> dispatch(deleteItemAsync(item.id)) }>
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
      <ScrollView className=" mb-[25%]">
        <View className="items-center justify-center flex-1 mb-[25%]">{itemsOutput}</View>
      </ScrollView>
      <View className="absolute bottom-0 flex flex-row w-full overflow-scroll border-t-2 border-white">
        <View className="inline w-full">
          <Input
            onChangeText={(text) => setTitle(text)}
            className="p-4 text-white"
            placeholder="Titel*"
            value={title}
          />
          <Input
            onChangeText={(text) => setDescription(text)}
            className="p-4 text-white"
            placeholder="Beschreibung"
            value={description}
          />
          <View className="absolute top-0 right-0 p-3 text-4xl ">
            <Pressable
              className="text-white rounded-2xl"
              onPress={() =>
                dispatch(
                  addItemAsync({
                    title: title,
                    description: description,
                    initiator: id,
                    household: household,
                    category: "Snack",
                  })
                )
              }
            >
              <Text className="p-6 text-white bg-slate-500 rounded-2xl">
                Hinzufügen
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

import { Text, View } from "../../components/Themed";

export default () => {
  return (
    <View className=" flex-1 items-center justify-center">
      <Text className=" text-xl font-bold">Finance</Text>
      <View
        className=" my-8 h-[1px] w-[80%]"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
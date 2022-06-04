import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    regular: require("../assets/fonts/Imprima-Regular.ttf"),
  });

import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  //const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          regular: require("./assets/fonts/Imprima-Regular.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // useEffect(() => {
  //   AsyncStorage.getItem("alreadyLaunched", "true").then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem("alreadyLaunched", "true"), setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null;
  // } else if (isFirstLaunch === true) {
  //   return (
  //     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
  //       <NavigationContainer>
  //         <Stack.Navigator
  //           screenOptions={{
  //             headerShown: false,
  //           }}
  //         >
  //           <Stack.Screen
  //             name="OnboardingScreen"
  //             component={OnboardingScreen}
  //           />
  //           <Stack.Screen name="LoginScreen" component={LoginScreen} />
  //           <Stack.Screen name="HomeScreen" component={HomeScreen} />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     </View>
  //   );
  // } else {
  //   return <LoginScreen />;
  // }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

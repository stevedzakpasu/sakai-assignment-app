import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AssignmentDetails from "./screens/AssignmentDetails";
import { getUserStatus } from "./hooks/LocalStorage";
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    getUserStatus("status").then((response) => setStatus(response));
  }, []);

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

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {status != "old" ? (
            <Stack.Screen name="Welcome" component={OnboardingScreen} />
          ) : null}

          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="Assignment Details"
            component={AssignmentDetails}
            options={{
              headerShown: true,
              headerTitleStyle: {
                fontFamily: "regular",
                fontSize: 35,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

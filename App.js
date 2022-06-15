import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Dimensions } from "react-native";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AssignmentDetails from "./screens/AssignmentDetails";

import { getUserID, getUserPIN } from "./hooks/SecureLocalStorage";
import { getUserStatus, getLoggedInStatus } from "./hooks/LocalStorage";
import { UserContext } from "./contexts/UserContext";

const { height, width } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [status, setStatus] = useState("");
  const [authenticated, setAuthenticated] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [PIN, setPIN] = useState("");

  useEffect(() => {
    getUserStatus("status").then((response) => setStatus(response));
    getUserID("username").then((response) => setIDNumber(response));
    getUserPIN("pin").then((response) => setPIN(response));
    getLoggedInStatus("loginstatus").then((response) =>
      setAuthenticated(response)
    );
  });

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
        <UserContext.Provider
          value={{
            status,
            setStatus,
            IDNumber,
            setIDNumber,
            PIN,
            setPIN,
            authenticated,
            setAuthenticated,
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {status !== "old" ? (
              <Stack.Group>
                <Stack.Screen
                  name="OnboardingScreen"
                  component={OnboardingScreen}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                {authenticated != "in" ? (
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                ) : null}

                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen
                  name="Assignment Details"
                  component={AssignmentDetails}
                  options={{
                    headerShown: true,
                    headerTitleStyle: {
                      fontFamily: "regular",
                      fontSize: width * 0.06,
                    },
                  }}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </View>
  );
}

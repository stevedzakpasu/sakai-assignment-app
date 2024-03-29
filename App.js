import React, { useCallback, useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Dimensions, Platform } from "react-native";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AssignmentDetails from "./screens/AssignmentDetails";
import { getUserID, getUserPIN } from "./hooks/SecureLocalStorage";
import { getUserStatus, getLoggedInStatus } from "./hooks/LocalStorage";
import { UserContext } from "./contexts/UserContext";
import * as Device from "expo-device";
const { height, width } = Dimensions.get("window");
const Stack = createNativeStackNavigator();
const SakaiAPI = require("sakai-api").default;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [status, setStatus] = useState("");
  const [authenticated, setAuthenticated] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [PIN, setPIN] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [semester, setSemester] = useState("S1-2223");
  const API = new SakaiAPI();
  const [assignmentsData, setAssignmentsData] = useState([]);

  useEffect(() => {
    getUserStatus("status").then((response) => setStatus(response));
    getUserID("username").then((response) => setIDNumber(response));
    getUserPIN("pin").then((response) => setPIN(response));
    getLoggedInStatus("loginstatus").then((response) =>
      setAuthenticated(response)
    );
  }, []);

  useEffect(() => {
    async function Login() {
      try {
        await API.login({ username: IDNumber, password: PIN }).then(
          console.log("logged in")
        );
      } catch (e) {
        console.log(e);
      }
    }

    Login();
  }, []);

  useEffect(() => {
    async function fetchAssignmentsData() {
      let assignments = await API.getMyAssignment()
        .then(console.log("fetched successfully"))
        .catch((e) => console.log(e));
      const raw_data = assignments.data.assignment_collection;
      setAssignmentsData(raw_data);
    }
    fetchAssignmentsData();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
            semester,
            setSemester,
            API,
            assignmentsData,
            setAssignmentsData,
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "3392f7e2-4e80-46d6-a0ff-bff7e2ef6c79",
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

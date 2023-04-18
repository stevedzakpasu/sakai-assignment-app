import { Text, View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import ActiveAssignments from "./ActiveAssignments";
import ClosedAssignments from "./ClosedAssignments";
import { UserContext } from "../contexts/UserContext";

const Tab = createMaterialTopTabNavigator();
const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const { IDNumber } = useContext(UserContext);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "rgba(63,188,166,0.5)",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 20,
          flexGrow: 0.01,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.1,
            textAlign: "center",
          }}
        >
          Hello,{IDNumber}
        </Text>
      </View>
      <View style={{ flex: 1, margin: 5 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "rgb(63,188,166)",
            tabBarLabelStyle: { fontSize: width * 0.03, fontFamily: "regular" },
            tabBarInactiveTintColor: "black",
            tabBarIndicatorStyle: {
              backgroundColor: "rgb(63,188,166)",
            },
            tabBarPressColor: "rgba(63,188,166,0.1)",
            tabBarPressOpacity: 1,
            tabBarStyle: {
              elevation: 0,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            },
          }}
        >
          <Tab.Screen name="Active" component={ActiveAssignments} />
          <Tab.Screen name="Recently Closed" component={ClosedAssignments} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

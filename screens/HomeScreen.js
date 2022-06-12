import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import ActiveAssignments from "./ActiveAssignments";
import OverdueAssignments from "./OverdueAssignments";
import CompletedAssignments from "./CompletedAssignments";
import { getUserID } from "../hooks/SecureLocalStorage";
const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserID("username").then((response) => setUsername(response));
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: "rgba(63,188,166,0.5)",
          marginBottom: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 20,
        }}
      >
        <Text
          style={{ fontFamily: "regular", fontSize: 60, textAlign: "center" }}
        >
          Hello, {username}
        </Text>
      </View>
      <View style={{ flex: 1, margin: 25 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "rgb(63,188,166)",
            tabBarLabelStyle: { fontSize: 15, fontFamily: "regular" },
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
          <Tab.Screen name="Overdue" component={OverdueAssignments} />
          <Tab.Screen name="Completed" component={CompletedAssignments} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

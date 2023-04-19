import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import * as Notifications from "expo-notifications";
export default function ActiveAssignments({ navigation }) {
  const [data, setData] = useState([]);
  const { semester, assignmentsData } = useContext(UserContext);

  useEffect(() => {
    async function showNotifications() {
      try {
        for (let item of data) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `You have a new assignment: ${item.context}, ${item.title}`,
            },
            trigger: {
              seconds: 5,
            },
          });
        }
      } catch (error) {
        console.log("Error showing notification:", error);
      }
    }

    showNotifications();
  }, [data]);

  useEffect(() => {
    async function filterOpenAssignments() {
      const filtered_data = assignmentsData.filter(
        (element) =>
          element.context.substring(11, 18) === semester &&
          element.status === "OPEN"
      );

      setData(filtered_data);
    }
    filterOpenAssignments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.courseTitle}>{item.context}</Text>
      <Text style={styles.assignmentTitle}>{item.title}</Text>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderTopColor: "black",
          borderTopWidth: 1,
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#95fbac",
            alignSelf: "flex-start",
            padding: 5,
            borderRadius: 20,
            width: 70,
            marginTop: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "blue" }}>
            {" "}
            {item.status}
          </Text>
        </View>

        <Pressable
          style={{
            position: "absolute",
            right: 20,
            top: 10,
            backgroundColor: "white",
            padding: 15,
            borderRadius: 40,
            alignSelf: "flex-end",
          }}
          onPress={() => navigation.navigate("Assignment Details", item)}
        >
          <AntDesign name="arrowright" size={15} color="black" />
        </Pressable>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.entityId}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgba(63, 188, 166, 0.1)",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  courseTitle: {
    fontSize: 25,
    fontFamily: "regular",
    marginBottom: 15,
  },
  assignmentTitle: {
    fontSize: 25,
    fontFamily: "regular",
  },
});

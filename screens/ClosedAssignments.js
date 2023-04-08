import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
const SakaiAPI = require("sakai-api").default;

export default function ClosedAssignments({ navigation }) {
  const [data, setData] = useState([]);
  const [semester, setSemester] = useState("S1-2223");

  (async () => {
    const API = new SakaiAPI();
    let assignments = await API.getMyAssignment();
    const raw_data = assignments.data.assignment_collection;
    const filtered_data = raw_data.filter(
      (element) =>
        element.context.substring(11, 18) === semester &&
        element.status === "CLOSED"
    );

    setData(filtered_data);
  })();

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
        {item.status == "CLOSED" ? (
          <View
            style={{
              backgroundColor: "#ffb8b8",
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
        ) : null}

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

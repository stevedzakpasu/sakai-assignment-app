import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AssignmentDetails from "./AssignmentDetails";
import React from "react";

export default function ActiveAssignments({ navigation }) {
  const DATA = [
    {
      id: "1",
      CourseCode: "DCIT 313",
      AssignmentTitle: "AI IN PRACTICE READING REPORT 1",
    },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.courseTitle}>{item.CourseCode}</Text>
      <Text style={styles.assignmentTitle}>{item.AssignmentTitle}</Text>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderTopColor: "black",
          borderTopWidth: 1,
          marginTop: 20,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "white",
            alignSelf: "flex-start",
            padding: 5,
            borderRadius: 20,
            width: 70,
            marginTop: 20,
          }}
        >
          <Text style={{ textAlign: "center" }}> OPEN</Text>
        </Pressable>

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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
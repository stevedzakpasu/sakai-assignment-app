import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { UserContext } from "../contexts/UserContext";
import { completedAssignments } from "../hooks/LocalStorage";
const { height, width } = Dimensions.get("window");

export default function AssignmentDetails({ route }) {
  const { completed, setCompleted } = useContext(UserContext);
  const [checkboxState, setCheckboxState] = useState();

  useEffect(() => {
    if (completed.includes(route.params.entityId)) {
      setCheckboxState(true);
    } else {
      setCheckboxState(false);
    }
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: width * 0.03,
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.1,
            // marginBottom: height * 0.01,
            alignSelf: "center",
          }}
        >
          {route.params.context}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.07,
            // lineHeight: height * 0.08,
            fontWeight: "700",
          }}
        >
          Title
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.06,
          }}
        >
          {route.params.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: height * 0.01,
        }}
      >
        <View
          style={{
            marginTop: height * 0.02,
            flex: 0.85,
          }}
        >
          <Text
            style={{
              fontSize: width * 0.06,
              fontFamily: "regular",
            }}
          >
            Open Date
          </Text>
          <Text
            style={{
              fontSize: width * 0.06,
              fontFamily: "regular",
            }}
          >
            {route.params.openTimeString}
          </Text>
        </View>

        <View style={{ marginTop: height * 0.02, flex: 0.4 }}>
          <Text
            style={{
              fontSize: width * 0.06,
              fontFamily: "regular",
            }}
          >
            Status
          </Text>

          {route.params.status === "CLOSED" ? (
            <Text
              style={{
                backgroundColor: "#ffb8b8",
                fontSize: width * 0.04,
                fontFamily: "regular",
                color: "blue",
                textAlign: "center",
                alignSelf: "flex-start",
                padding: 5,
                borderRadius: 25,
              }}
            >
              {route.params.status}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: width * 0.06,
                fontFamily: "regular",
                color: "red",
              }}
            >
              {route.params.status}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: height * 0.025,
          marginBottom: height * 0.025,
        }}
      >
        <View style={{ flex: 0.85 }}>
          <Text style={{ fontSize: width * 0.06, fontFamily: "regular" }}>
            Due Date
          </Text>
          <Text style={{ fontSize: width * 0.06, fontFamily: "regular" }}>
            {route.params.dueTimeString}
          </Text>
        </View>

        <View style={{ flex: 0.4 }}>
          <Text style={{ fontSize: width * 0.06, fontFamily: "regular" }}>
            Grade Points
          </Text>

          <Text style={{ fontSize: width * 0.06, fontFamily: "regular" }}>
            {route.params.maxGradePoint}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: height * 0.025 }}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.07,
            fontWeight: "700",
          }}
        >
          Submission Type
        </Text>
        <Text
          // numberOfLines={2}
          style={{
            fontFamily: "regular",
            fontSize: width * 0.05,
          }}
        >
          {route.params.submissionType}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.07,

            fontWeight: "700",
          }}
        >
          Resubmission status
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: width * 0.06 }}>
          {route.params.allowResubmission}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.07,

            fontWeight: "700",
          }}
        >
          Instructions
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: width * 0.06 }}>
          {route.params.instructions}
        </Text>
      </View>
      <View>
        <View
          style={{
            borderColor: "#6C63FF",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: height * 0.015,
            borderRadius: 10,
            margin: height * 0.04,
          }}
        >
          <Text
            style={{
              fontFamily: "regular",
              fontSize: width * 0.07,
              color: "#6C63FF",
            }}
          >
            Mark as complete
          </Text>

          <BouncyCheckbox
            size={width * 0.07}
            fillColor="#6C63FF"
            unfillColor="#FFFFFF"
            isChecked={checkboxState}
            iconStyle={{ borderColor: "#6C63FF" }}
            textStyle={{ fontFamily: "regular" }}
            disableBuiltInState
            onPress={() => {
              if (!completed.includes(route.params.entityId)) {
                completed.push(route.params.entityId);
              } else {
                completed.pop(route.params.entityId);
              }
              setCheckboxState(!checkboxState);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

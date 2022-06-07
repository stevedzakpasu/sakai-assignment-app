import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function AssignmentDetails({ route }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
      <View>
        <Text style={{ fontFamily: "regular", fontSize: 40, marginBottom: 30 }}>
          {route.params.CourseCode}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 30,
            lineHeight: 50,
            fontWeight: "700",
          }}
        >
          Title
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: 25, lineHeight: 50 }}>
          {route.params.AssignmentTitle}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 50,
        }}
      >
        <View style={{ flex: 0.7 }}>
          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            Open Date
          </Text>
          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            May 12,2022
          </Text>
        </View>

        <View>
          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            Status
          </Text>

          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            OPEN
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 50,
        }}
      >
        <View style={{ flex: 0.7 }}>
          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            Due Date
          </Text>
          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            May 12,2022
          </Text>
        </View>

        <View>
          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            Grade Points
          </Text>

          <Text style={{ lineHeight: 50, fontSize: 25, fontFamily: "regular" }}>
            50.00
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 30,
            lineHeight: 50,
            fontWeight: "700",
          }}
        >
          Submission Type
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontFamily: "regular", fontSize: 24, lineHeight: 50 }}
        >
          ATTACHMENT_ONLY_ASSIGNMENT_SUBMISSION
        </Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 30,
            lineHeight: 50,
            fontWeight: "700",
          }}
        >
          Resubmittion status
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: 25, lineHeight: 50 }}>
          Allowed
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 30,
            lineHeight: 50,
            fontWeight: "700",
          }}
        >
          Instructions
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: 25, lineHeight: 50 }}>
          This assignment will be due on Friday
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            borderColor: "#6C63FF",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontFamily: "regular", fontSize: 40, color: "#6C63FF" }}
          >
            Mark as complete
          </Text>

          <BouncyCheckbox
            size={25}
            fillColor="#6C63FF"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: "#6C63FF" }}
            textStyle={{ fontFamily: "regular" }}
            onPress={(_isChecked: boolean) => {}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

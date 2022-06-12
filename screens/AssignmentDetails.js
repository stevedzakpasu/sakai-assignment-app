import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const { height, width } = Dimensions.get("window");
export default function AssignmentDetails({ route }) {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: width * 0.03,
      }}
      contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
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
          {route.params.CourseCode}
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
          {route.params.AssignmentTitle}
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
            May 12,2022
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

          <Text
            style={{
              fontSize: width * 0.06,
              fontFamily: "regular",
            }}
          >
            OPEN
          </Text>
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
            May 12,2022
          </Text>
        </View>

        <View style={{ flex: 0.4 }}>
          <Text style={{ fontSize: width * 0.06, fontFamily: "regular" }}>
            Grade Points
          </Text>

          <Text style={{ fontSize: width * 0.06, fontFamily: "regular" }}>
            50.00
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
          ATTACHMENT_ONLY_ASSIGNMENT_SUBMISSION
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
          Resubmittion status
        </Text>
        <Text style={{ fontFamily: "regular", fontSize: width * 0.06 }}>
          Allowed
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
          This assignment will be due on Friday
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
            iconStyle={{ borderColor: "#6C63FF" }}
            textStyle={{ fontFamily: "regular" }}
            onPress={(_isChecked) => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

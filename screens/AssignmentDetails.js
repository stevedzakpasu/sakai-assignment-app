import { StyleSheet, Text, ScrollView, View, Dimensions } from "react-native";
import React from "react";
import { format } from "date-fns";
const { height, width } = Dimensions.get("window");

export default function AssignmentDetails({ route }) {
  function formatDate(inputDateString) {
    const date = new Date(inputDateString);
    const day = format(date, "d");
    const month = format(date, "MMMM");
    const year = format(date, "yyyy");
    const hour = format(date, "h");
    const minute = format(date, "mm");
    const amPm = format(date, "a");
    const outputString = `${day}${daySuffix(
      day
    )} ${month} ${year} at ${hour}:${minute}${amPm}`;

    function daySuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    return outputString;
  }

  function removeUnderscores(str) {
    return str.replace(/_/g, " ");
  }

  function extractCourseCode(str) {
    const regex = /^([A-Z]+)-(\d+)-\d+-[A-Z]\d+-\d+$/;
    const match = regex.exec(str);
    if (match) {
      const courseCode = match[1] + " " + match[2];
      return courseCode;
    } else {
      return null;
    }
  }

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
          {extractCourseCode(route.params.context)}
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
            {formatDate(route.params.openTimeString)}
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

          {route.params.status === "OPEN" ? (
            <Text
              style={{
                // backgroundColor: "#ffb8b8",
                fontSize: width * 0.06,
                fontFamily: "regular",
                color: "green",
                // padding: 5,
                // borderRadius: 25,
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
            {formatDate(route.params.dueTimeString)}
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
      {/* <View style={{ marginBottom: height * 0.025 }}>
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
          {removeUnderscores(route.params.submissionType)}
        </Text>
      </View> */}
      {/* <View>
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
      </View> */}
      <View style={{ marginBottom: height * 0.025 }}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.07,
            fontWeight: "700",
          }}
        >
          Instructions
        </Text>
        <Text
          style={{
            fontFamily: "regular",

            fontSize: width * 0.06,
          }}
        >
          {route.params.instructions.replace(/(<([^>]+)>)/gi, "")}
        </Text>
      </View>
      <View style={{ marginBottom: height * 0.025 }}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: width * 0.07,
            fontWeight: "700",
          }}
        >
          Link to assignment
        </Text>

        <Text style={{ fontFamily: "regular", fontSize: width * 0.06 }}>
          Click Here To View on Sakai
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

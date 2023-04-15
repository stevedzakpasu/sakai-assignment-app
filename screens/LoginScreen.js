import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { userID, userPIN } from "../hooks/SecureLocalStorage";
import { LoggedInStatus, getLoggedInStatus } from "../hooks/LocalStorage";
import { UserContext } from "../contexts/UserContext";
const SakaiAPI = require("sakai-api").default;

const { height, width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const { IDNumber, PIN, setIDNumber, setPIN } = useContext(UserContext);

  async function login() {
    const API = new SakaiAPI();
    try {
      await API.login({ username: IDNumber, password: PIN });
      LoggedInStatus("loginstatus", "in");
      navigation.navigate("HomeScreen");
    } catch (e) {
      Alert.alert("Error", "Please try again");
      console.log(e);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: height * 0.01,
          paddingTop: height * 0.05,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: height * 0.05,
            textAlign: "center",
          }}
        >
          Easy Access To Your Account
        </Text>
      </View>

      <View>
        <Text
          style={{
            fontFamily: "regular",
            marginLeft: height * 0.03,
            marginTop: height * 0.08,
            fontSize: height * 0.04,
          }}
        >
          Index Number
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="user"
          size={height * 0.03}
          color="black"
          style={{ position: "absolute", left: width * 0.05 }}
        />
        <TextInput
          style={styles.input}
          onChangeText={(ID) => {
            setIDNumber(ID);
            userID("username", ID);
          }}
          // value={studentNumber}
          keyboardType="numeric"
          selectionColor={"black"}
          maxLength={8}
        />
      </View>
      <View>
        <Text
          style={{
            fontFamily: "regular",
            marginLeft: height * 0.03,
            fontSize: height * 0.04,
          }}
        >
          PIN
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="lock"
          size={width * 0.07}
          color="black"
          style={{ position: "absolute", left: width * 0.05 }}
        />
        <TextInput
          style={styles.input}
          onChangeText={(PINCode) => {
            setPIN(PINCode);
            userPIN("pin", PINCode);
          }}
          keyboardType="numeric"
          selectionColor={"black"}
          maxLength={5}
          secureTextEntry={!showPassword}
        />
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={width * 0.07}
          color="black"
          style={{ position: "absolute", right: width * 0.1 }}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        />
      </View>

      <Pressable
        style={{
          backgroundColor: "#5590D2",
          justifyContent: "center",

          width: "90%",
          padding: width * 0.0001,
          borderRadius: 10,
          height: height * 0.06,
          margin: "5%",
        }}
        onPress={() => {
          login();
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: height * 0.04,
            alignSelf: "center",
            color: "white",
          }}
        >
          Login
        </Text>
      </Pressable>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          margin: "5%",
        }}
      >
        <Ionicons
          name="warning-outline"
          size={24}
          color="#EEBA00"
          style={{ margin: height * 0.01 }}
        />
        <Text style={{ textAlign: "center", lineHeight: height * 0.04 }}>
          This app makes use of an API to allow you access to your student
          account as a result none of your personal details are stored either in
          a database or in the application memory
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: height * 0.03,
    fontFamily: "regular",
    color: "black",
    flex: 1,
    height: height * 0.06,
    margin: height * 0.03,
    marginLeft: width * 0.13,
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: "rgba(63,188,166,0.1)",
    alignSelf: "center",
    flexGrow: 1,
  },
});

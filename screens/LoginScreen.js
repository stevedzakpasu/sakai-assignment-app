import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
        }}
      >
        <Text
          style={{ fontFamily: "regular", fontSize: 50, textAlign: "center" }}
        >
          Easy Access To Your Account
        </Text>
      </View>

      <View style={{ margin: 25 }}>
        <Text style={{ fontFamily: "regular", fontSize: 40 }}>Login</Text>
      </View>

      <View>
        <Text style={{ fontFamily: "regular", marginLeft: 25, fontSize: 25 }}>
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
          size={24}
          color="black"
          style={{ position: "absolute", left: 20 }}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          keyboardType="numeric"
          selectionColor={"black"}
          maxLength={8}
        />
      </View>
      <View>
        <Text style={{ fontFamily: "regular", marginLeft: 25, fontSize: 25 }}>
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
          size={24}
          color="black"
          style={{ position: "absolute", left: 20 }}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
          selectionColor={"black"}
          maxLength={5}
          secureTextEntry={true}
        />
        <Ionicons
          name="eye-off"
          size={24}
          color="black"
          style={{ position: "absolute", right: 30 }}
        />
      </View>

      <Pressable
        style={{
          backgroundColor: "#5590D2",
          alignSelf: "center",
          width: "80%",
          padding: 5,
          borderRadius: 10,
          height: 50,
          margin: "15%",
        }}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 35,
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
          style={{ margin: 5 }}
        />
        <Text style={{ textAlign: "center", lineHeight: 25 }}>
          This app makes use of an api to allow you access to your student
          account as a result none of your personal details are stored either in
          a database or in the application memory
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  input: {
    fontSize: 25,
    fontFamily: "regular",
    color: "black",
    flex: 1,
    height: 40,
    margin: 20,
    marginLeft: 50,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "rgba(63,188,166,0.1)",
    alignSelf: "center",
  },
});

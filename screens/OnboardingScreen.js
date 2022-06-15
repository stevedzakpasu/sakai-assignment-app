import { Image, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { userStatus } from "../hooks/LocalStorage";

const { height, width } = Dimensions.get("window");

const Done = ({ ...props }) => (
  <Pressable
    style={{
      backgroundColor: "#5590D2",
      borderRadius: 25,
      padding: height * 0.005,
      marginRight: width * 0.01,
    }}
    {...props}
  >
    <Text
      style={{
        fontFamily: "regular",
        fontSize: width * 0.05,
        margin: height * 0.005,
        color: "white",
      }}
    >
      Get Started
    </Text>
  </Pressable>
);

const OnboardingScreen = ({ navigation }) => (
  <Onboarding
    onDone={() => {
      navigation.navigate("LoginScreen");
      userStatus("status", "old");
    }}
    showSkip={false}
    showNext={false}
    bottomBarHighlight={false}
    DoneButtonComponent={Done}
    titleStyles={{
      color: "black",
      fontFamily: "regular",
      fontSize: width * 0.06,
    }}
    subTitleStyles={{
      color: "black",
      fontFamily: "regular",
      fontSize: width * 0.06,
    }}
    pages={[
      {
        backgroundColor: "#3FBCA6",
        image: (
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../images/onboarding-img1.png")}
          />
        ),
        title: "Get reminders for your assignments",
        subtitle: "With the help of periodic notifications",
      },
      {
        backgroundColor: "#3FBCA6",
        image: (
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../images/onboarding-img2.png")}
          />
        ),
        title: "Keep track of your assignments",
        subtitle: "Categorizing them into categories",
      },
      {
        backgroundColor: "#3FBCA6",
        image: (
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../images/onboarding-img3.png")}
          />
        ),
        title: "You will never miss any assignment again!",
        subtitle: "All your assignments in one place!",
      },
    ]}
  />
);

export default OnboardingScreen;

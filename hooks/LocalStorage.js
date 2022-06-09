import AsyncStorage from "@react-native-async-storage/async-storage";
const userStatus = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};

const getUserStatus = async (key) => {
  try {
    let status = await AsyncStorage.getItem(key);
    return status;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};
const userID = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert("ok");
  }
};

const getUserID = async (key) => {
  try {
    let status = await AsyncStorage.getItem(key);
    return status;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};
const userPIN = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert("hi");
  }
};

const getUserPIN = async (key) => {
  try {
    let status = await AsyncStorage.getItem(key);
    return status;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};

export { userStatus, getUserStatus, userID, getUserID, userPIN, getUserPIN };

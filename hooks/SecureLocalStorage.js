import * as SecureStore from "expo-secure-store";

async function userPIN(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
}

async function getUserPIN(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
}
async function userID(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
}

async function getUserID(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
}
export { userID, userPIN, getUserID, getUserPIN };

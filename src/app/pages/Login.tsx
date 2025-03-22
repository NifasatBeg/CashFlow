import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomBox from "../components/CustomBox";
import CustomText from "../components/CustomText";
import LoginService from "../api/LoginService";
import GENERAL_CONFIG from "../config/AppConfig";

const Login = ({ navigation }: any) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const goToSignUp = () => {
    navigation.navigate("SignUp", { name: "SignUp" });
  };

  const refreshToken = async () => {
    const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;
    console.log("Inside Refresh token");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/refreshToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem("accessToken", data["accessToken"]);
      await AsyncStorage.setItem("refreshToken", data["token"]);
      console.log(
        "Tokens after refresh are " +
          (await AsyncStorage.getItem("refreshToken")) +
          " " +
          (await AsyncStorage.getItem("accessToken"))
      );
    }

    return response.ok;
  };

  const gotoHomePageWithLogin = async () => {
    console.log("Inside login");
    const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;

    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ username: userName, password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem("refreshToken", data["token"]);
      await AsyncStorage.setItem("accessToken", data["accessToken"]);
      await AsyncStorage.removeItem("userId");
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const loggedIn = await new LoginService().isLoggedIn();
    console.log({ loggedIn });
    setLoggedIn(loggedIn);

    if (loggedIn) {
      navigation.navigate("Home", { name: "Home" });
    } else {
      const refreshed = await refreshToken();
      setLoggedIn(refreshed);
      if (refreshed) {
        navigation.navigate("Home", { name: "Home" });
      }
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <View style={styles.loginContainer}>
      <CustomBox style={loginBox}>
        <CustomText style={styles.heading}>Login</CustomText>
        <TextInput
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
          style={styles.textInput}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          placeholderTextColor="#888"
          secureTextEntry
        />
      </CustomBox>

      <Button mode="contained" onPress={gotoHomePageWithLogin} style={styles.button}>
        Submit
      </Button>

      <Button mode="outlined" onPress={goToSignUp} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    marginTop: 20,
    width: "50%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    color: "black",
  },
});

const loginBox = {
  mainBox: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  shadowBox: {
    backgroundColor: "gray",
    borderRadius: 10,
  },
};

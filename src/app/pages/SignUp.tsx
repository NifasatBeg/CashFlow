import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import CustomText from "../components/CustomText";
import CustomBox from "../components/CustomBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GENERAL_CONFIG from "../config/AppConfig";

const SignUp = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigateToLoginScreen = async () => {
    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password,
      username: userName,
    });
    console.log(body);
    try {
      const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;
      const response = await fetch(`${SERVER_BASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: body
      });
      console.log({response})

      const data = await response.json();
      console.log(data);
      await AsyncStorage.setItem("accessToken", data["accessToken"]);
      await AsyncStorage.setItem("refreshToken", data["token"]);

      await AsyncStorage.removeItem("userId");

      navigation.navigate("Home", { name: "Home" });
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login", { name: "Login" });
  };

  return (
    <View style={styles.signupContainer}>
      <CustomBox style={signUpBox}>
        <CustomText style={styles.heading}>Sign Up</CustomText>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.textInput}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.textInput}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
          style={styles.textInput}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.textInput}
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />
      </CustomBox>

      <Button mode="contained" onPress={navigateToLoginScreen} style={styles.button}>
        Sign Up
      </Button>
      <Button mode="outlined" onPress={goToLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signupContainer: {
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

const signUpBox = {
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

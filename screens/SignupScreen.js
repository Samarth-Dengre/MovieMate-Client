import React, { useContext, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import Form from "../components/Form/Form";
import { AuthContext } from "../store/authContext";
import Toast from "react-native-simple-toast";
import axios from "axios";
import { auth } from "../utils/routes";

function SignupScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Inputs array define the fields that are to be present in th login form
  const inputs = [
    {
      placeholder: "username",
      onChangeText: setUserName,
    },
    {
      placeholder: "email",
      keyboardType: "email-address",
      inputMode: "email",
      onChangeText: setEmail,
    },
    {
      placeholder: "password",
      secureTextEntry: true,
      onChangeText: setPassword,
    },
    {
      placeholder: "confirm password",
      onChangeText: setConfirmPassword,
    },
  ];

  // Function to check validity of the fields
  function checkIsValid() {
    if (userName.length < 5) {
      Toast.showWithGravity(
        "Username should be of more than 5 characters",
        Toast.SHORT,
        Toast.TOP
      );
      return false;
    } else if (!email.includes("@")) {
      Toast.showWithGravity("incorrect email", Toast.SHORT, Toast.TOP);
      return false;
    } else if (password.length < 5) {
      Toast.showWithGravity(
        "Password should be greater than 5 characters",
        Toast.SHORT,
        Toast.TOP
      );
      return false;
    } else if (password !== confirmPassword) {
      Toast.showWithGravity(
        "Password and confirm Password don not match",
        Toast.SHORT,
        Toast.TOP
      );
      return false;
    }

    return true;
  }

  // Function to handle the submit event of the signup form
  async function onSignupFormSubmitHandler() {
    try {
      Keyboard.dismiss();
      const isValid = checkIsValid();
      if (!isValid) return;
      const user = {
        userName,
        email,
        password,
      };

      setIsLoading(true);
      const { data } = await axios.post(auth, user);
      setIsLoading(false);
      if (data.status === 400) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        return;
      }
      authCtx.authenticate(user);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* This form component renders the signup form */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: 0.5,
          flex: 1,
        }}
      ></View>
      <Form
        inputs={inputs}
        onSubmit={onSignupFormSubmitHandler}
        title="MovieMate"
        primaryLabel="Signup"
        secondaryLabel="Login?"
        onOtherButtonPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});

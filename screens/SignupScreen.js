import React, { useContext, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import Form from "../components/Form/Form";
import { AuthContext } from "../store/authContext";
import Toast from "react-native-simple-toast";
import axios from "axios";
import { auth } from "../utils/routes";
import SimpleModal from "../components/modals/SimpleModal";

function SignupScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [userName, setUserName] = useState(""); // Username state
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password state
  const [isLoading, setIsLoading] = useState(false); // Loading state to show the loader when the user is logging in
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
      // If the username is less than 5 characters, then it is not a valid username
      Toast.showWithGravity(
        "Username should be of more than 5 characters",
        Toast.SHORT,
        Toast.TOP
      );
      return false;
    } else if (!email.includes("@")) {
      // If the email does not contain @, then it is not a valid email
      Toast.showWithGravity("incorrect email", Toast.SHORT, Toast.TOP);
      return false;
    } else if (password.length < 5) {
      // If the password is less than 5 characters, then it is not a valid password
      Toast.showWithGravity(
        "Password should be greater than 5 characters",
        Toast.SHORT,
        Toast.TOP
      );
      return false;
    } else if (password !== confirmPassword) {
      // If the password and confirm password do not match, then it is not a valid password
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
      Keyboard.dismiss(); // Dismiss the keyboard when the user clicks on the submit button
      const isValid = checkIsValid(); // Check if the fields are valid or not
      if (!isValid) return;
      const user = {
        userName,
        email,
        password,
      };

      setIsLoading(true);

      // Send the user data to the server to signup
      const { data } = await axios.post(auth, user);
      setIsLoading(false);
      if (data.status === 400) {
        // If the status is 400, then the user already exists and we show a toast message
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        return;
      }
      authCtx.authenticate(data.user); // If the user is successfully signed up, then we authenticate the user and navigate to the home screen
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* This loader component renders the loader when the user is signing up */}
      <SimpleModal visible={isLoading} />
      {/* This form component renders the signup form */}
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

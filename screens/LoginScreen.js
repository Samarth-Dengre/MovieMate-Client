import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import Form from "../components/Form/Form";
import { AuthContext } from "../store/authContext";
import Toast from "react-native-simple-toast";
import axios from "axios";
import { auth } from "../utils/routes";
function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Inputs array define the fields that are to be present in th login form
  const inputs = [
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
  ];

  // Function to check validity of the fields
  function checkValidity() {
    if (!email.includes("@")) {
      Toast.showWithGravity("Email is not correct", Toast.SHORT, Toast.TOP);
      return false;
    } else if (password.length < 5) {
      Toast.showWithGravity(
        "Password should contain atleast 6 characters".Toast.SHORT,
        Toast.TOP
      );
      return false;
    }

    return true;
  }

  // Function to handle the login form submit
  async function onLoginFormSubmitHandler() {
    const isValid = checkValidity();
    if (!isValid) return false;
    try {
      setIsLoading(true);
      // Sending a get request to the server for login
      const { data } = await axios.get(
        `${auth}/?email=${email}&password=${password}`
      );
      setIsLoading(false);
      // If the status is 400, then the user is not authenticated ot there is some error in the server
      if (data.status === 400) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        return;
      }

      // If the status is 200, then the user is authenticated
      authCtx.authenticate(data);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  }

  return (
    <View style={styles.container}>
      {/* This form component renders the login form */}
      {isLoading && (
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
            zIndex: 2,
          }}
        ></View>
      )}
      <Form
        inputs={inputs}
        onSubmit={onLoginFormSubmitHandler}
        title="MovieMate"
        primaryLabel="Login"
        secondaryLabel="Signup?"
        onOtherButtonPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});

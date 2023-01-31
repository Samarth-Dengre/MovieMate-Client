import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import Form from "../components/Form/Form";
import { AuthContext } from "../store/authContext";
import Toast from "react-native-simple-toast";
import axios from "axios";
import { auth } from "../utils/routes";
import SimpleModal from "../components/modals/SimpleModal";
function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [isLoading, setIsLoading] = useState(false); // Loading state to show the loader when the user is logging in

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
      // If the email does not contain @, then it is not a valid email
      Toast.showWithGravity("Email is not correct", Toast.SHORT, Toast.TOP);
      return false;
    } else if (password.length < 5) {
      // If the password is less than 5 characters, then it is not a valid password
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
    const isValid = checkValidity(); // Checking the validity of the fields
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
      authCtx.authenticate(data.user);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  }

  return (
    <View style={styles.container}>
      {/* This loader component is shown when the user is logging in */}
      <SimpleModal visible={isLoading} />
      {/* This form component renders the login form */}
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

import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Form from "../components/Form/Form";
import { AuthContext } from "../store/authContext";

const inputs = [
  {
    placeholder: "email",
  },
  {
    placeholder: "password",
  },
];

function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  function onLoginFormSubmitHandler(user) {
    authCtx.authenticate(user);
  }

  return (
    <View style={styles.container}>
      <Form
        inputs={inputs}
        onSubmit={onLoginFormSubmitHandler}
        title="MovieMate"
      />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

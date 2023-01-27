import React from "react";
import { View, Text, Button } from "react-native";

function SignupScreen({ navigation }) {
  return (
    <View>
      <Text>Signup</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}

export default SignupScreen;

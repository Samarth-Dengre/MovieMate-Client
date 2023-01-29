import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../store/authContext";
function ProfileScreen() {
  const authContext = useContext(AuthContext);
  return (
    <View>
      <Button title="Logout" onPress={() => authContext.logout()} />
    </View>
  );
}

export default ProfileScreen;

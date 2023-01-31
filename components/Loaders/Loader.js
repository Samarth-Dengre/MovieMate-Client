import React from "react";
import { View, ActivityIndicator } from "react-native";
function Loader() {
  return (
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default Loader;

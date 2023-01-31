import React from "react";
import { Image, StyleSheet, View } from "react-native";

function GifLoader() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/giphy.gif")} />
    </View>
  );
}

export default GifLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

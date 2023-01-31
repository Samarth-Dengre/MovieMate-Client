import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function ErrorPage() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/error.webp")} style={styles.image} />
    </View>
  );
}

export default ErrorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  image: {
    width: 300,
    height: 300,
  },
});

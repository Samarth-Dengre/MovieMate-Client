import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ErrorPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error</Text>
    </View>
  );
}

export default ErrorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
});

import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";

function OutlinedButton({ label, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        android_ripple={{ color: "black" }}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent800,
    borderRadius: 6,
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent800,
  },
  pressed: {
    opacity: 0.7,
  },
});

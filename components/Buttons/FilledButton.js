import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";

function FilledButton({ label, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        android_ripple={{ color: 'blackf' }}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

export default FilledButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent800,
    borderRadius: 6,
    elevation: 2,
    width: 170,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});

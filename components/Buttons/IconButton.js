import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "react-native-vector-icons";

function IconButton({ name, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});

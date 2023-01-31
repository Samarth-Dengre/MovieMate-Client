import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "react-native-vector-icons";

function FilledButton({ label, onPress, icon }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        android_ripple={{ color: "black" }}
      >
        <Text style={styles.label}>{label}</Text>
        {icon && (
          <Ionicons name={icon.name} size={icon.size} color={icon.color} />
        )}
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
    minWidth: 160,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 7,

  },
  pressed: {
    opacity: 0.7,
  },
});

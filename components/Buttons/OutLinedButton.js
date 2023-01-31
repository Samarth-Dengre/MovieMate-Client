import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "react-native-vector-icons";

function OutlinedButton({ label, onPress, icon }) {
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

export default OutlinedButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent800,
    borderRadius: 6,
    minWidth: 170,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent800,
    marginHorizontal: 7,
  },
  pressed: {
    opacity: 0.7,
  },
});

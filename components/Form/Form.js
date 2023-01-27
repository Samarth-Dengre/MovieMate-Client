import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import FilledButton from "../Buttons/FilledButton";

function Form({ inputs, onSubmit, title }) {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{title}</Text>
        {inputs.length > 0 &&
          inputs.map((input, index) => (
            <TextInput
              key={index}
              placeholder={input.placeholder}
              style={styles.inputText}
            />
          ))}
        <FilledButton label="Login" onPress={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    marginBottom: 30,
    fontSize: 24,
  },
  inputText: {
    height: 40,
    fontSize: 16,
    color: "white",
    backgroundColor: "beige",
    width: "85%",
    borderRadius: 6,
    padding: 10,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "black",
    width: "90%",
    height: 380,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 4,
  },
});

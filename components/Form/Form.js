import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import FilledButton from "../Buttons/FilledButton";
import OutlinedButton from "../Buttons/OutLinedButton";

function Form({
  inputs, //All the input fields
  onSubmit, //When the primary button is clicked
  title, // Title of Form
  onOtherButtonPress, //When the secondary button is pressed
  primaryLabel, //Label of primary button
  secondaryLabel, //Label of secondary button
}) {
  return (
    // Used KeyboardAvoiding view to prevent screen layout from being affected when the keyboard is opened
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{title}</Text>
        {inputs.length > 0 &&
          inputs.map((input, index) => (
            <TextInput
              key={index}
              placeholder={input.placeholder}
              style={styles.inputText}
              secureTextEntry={input.secureTextEntry}
              keyboardType={input.keyboardType}
              onChangeText={input.onChangeText}
              autoCapitalize="none"

            />
          ))}
        {/* The container to hold primary and secondary button */}
        <View style={styles.buttonContainer}>
          <FilledButton label={primaryLabel} onPress={onSubmit} />
          <OutlinedButton label={secondaryLabel} onPress={onOtherButtonPress} />
        </View>
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
    height: 50,
    fontSize: 16,
    color: "black",
    backgroundColor: "beige",
    width: "85%",
    borderRadius: 6,
    padding: 10,
    marginBottom: 30,
    elevation: 16,
  },
  formContainer: {
    backgroundColor: "black",
    overflow: "hidden",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 30,
    elevation:4
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
});

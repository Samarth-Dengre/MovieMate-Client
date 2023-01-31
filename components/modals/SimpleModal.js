import React from "react";
import { View, Modal } from "react-native";
import Loader from "../Loaders/Loader";

function SimpleModal({ visible }) {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Loader />
      </View>
    </Modal>
  );
}

export default SimpleModal;

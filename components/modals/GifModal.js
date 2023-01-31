import React from "react";
import { View, Modal } from "react-native";
import GifLoader from "../Loaders/GifLoader";

function GifModal({ visible }) {
  return (
    <Modal visible={visible} transparent={true}>
      <GifLoader />
    </Modal>
  );
}

export default GifModal;

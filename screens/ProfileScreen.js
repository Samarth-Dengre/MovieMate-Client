import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { AuthContext } from "../store/authContext";
import FilledButton from "../components/Buttons/FilledButton";
import OutlinedButton from "../components/Buttons/OutLinedButton";
import { auth } from "../utils/routes";
import Toast from "react-native-simple-toast";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";
import SimpleModal from "../components/modals/SimpleModal";

function ProfileScreen() {
  const authContext = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const logout = () => {
    authContext.logout();
  };

  async function deleteAccount() {
    setIsDeleting(true);
    setShowConfirmationModal(false);
    try {
      const { data } = await axios.put(auth, {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      });

      if (data.status === 200) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        authContext.logout();
      }

      if (data.status === 400) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
      }
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      return <ErrorPage />;
    }
  }

  const user = authContext.user;
  return (
    <View style={styles.container}>
      <Modal visible={showConfirmationModal} transparent={true}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: 24,
                textAlign: "center",
              },
            ]}
          >
            Are you sure you want to delete your account?
          </Text>
          <View
            style={[
              styles.buttonContainer,
              {
                justifyContent: "space-evenly",
                width: "100%",
                marginTop: 20,
              },
            ]}
          >
            <FilledButton
              onPress={() => {
                deleteAccount();
              }}
              label="yes"
              icon={{
                name: "checkmark",
                size: 28,
                color: "black",
              }}
            />
            <OutlinedButton
              onPress={() => {
                setShowConfirmationModal(false);
              }}
              label="no"
              icon={{
                name: "close",
                size: 28,
                color: "red",
              }}
            />
          </View>
        </View>
      </Modal>

      {/* This is the loader component that will be displayed when the user is deleting their account */}
      <SimpleModal visible={isDeleting} />

      <View style={styles.detailsContainer}>
        <Text style={[styles.text, styles.username]}>{user.name}</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <FilledButton
          onPress={logout}
          label="logout"
          icon={{
            name: "log-out",
            size: 28,
            color: "black",
          }}
        />
        <OutlinedButton
          onPress={() => {
            setShowConfirmationModal(true);
          }}
          label="delete account"
          icon={{
            name: "trash",
            size: 28,
            color: "red",
          }}
        />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    color: "white",
  },
  username: {
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import MoviesScreen from "./screens/MoviesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "./constants/Colors";

// Different Navigation Stacks For Screens
const BottomTabs = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator();
// The component to be rendered when the user is auhenticated
const AuthStack = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="home" color={color} size={24} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="star" color={color} size={24} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={24}
              />
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

// The component to be rendered when the user is not authenticated
const IsNotAuthStack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
      }}
    >
      <NativeStack.Screen name="Login" component={LoginScreen} />
      <NativeStack.Screen name="Signup" component={SignupScreen} />
    </NativeStack.Navigator>
  );
};

// This component will check whether the user is authenticated or not and present the respective screen stack
const Root = () => {
  const authCtx = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function fetchAndVerifyStoredUser() {
      try {
        setAppIsReady(false);
        const user = await AsyncStorage.getItem("user");
        if (user) {
          authCtx.authenticate(user);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    fetchAndVerifyStoredUser();
  }, []);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("./assets/giphy.gif")}
          style={{ resizeMode: "contain" }}
        />
      </View>
    );
  }

  const myTheme = {
    colors: {
      background: Colors.primaryBackGround,
    },
  };
  return (
    <NavigationContainer theme={myTheme}>
      {authCtx.isAuthenticated ? <AuthStack /> : <IsNotAuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import MoviesScreen from "./screens/MoviesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "./constants/Colors";
import { useFonts } from "expo-font";
import IndividualMovieScreen from "./screens/IndividualMovieScreen";
import GenreScreen from "./screens/GenreScreen";

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
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: Colors.accent800,
        tabBarInactiveTintColor: "white",
      }}
      initialRouteName="Home"
    >
      <BottomTabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "star" : "star-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Home"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "md-home-sharp" : "md-home-outline"}
                color={color}
                size={size}
              />
            );
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
                size={size}
              />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Individual"
        component={IndividualMovieScreen}
        options={{
          tabBarIconStyle: {
            display: "none",
          },
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
      <BottomTabs.Screen
        name="Genre"
        component={GenreScreen}
        options={{
          tabBarIconStyle: {
            display: "none",
          },
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarButton: () => null,
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

  const [loaded] = useFonts({
    "Oswald-Regular": require("./fonts/Oswald-Regular.ttf"),
    "RobotoSlab-Regular": require("./fonts/RobotoSlab-Regular.ttf"),
    "Lora-Regular": require("./fonts/Lora-Regular.ttf"),
  });

  useEffect(() => {
    async function fetchAndVerifyStoredUser() {
      try {
        setAppIsReady(false);
        const user = await AsyncStorage.getItem("user");
        if (user) {
          authCtx.authenticate(JSON.parse(user));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    fetchAndVerifyStoredUser();
  }, []);

  if (!appIsReady || !loaded) {
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

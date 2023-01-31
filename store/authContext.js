import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  async function authenticate(user) {
    setUser(user);
    const userIsPresent = await AsyncStorage.getItem("user");
    if (userIsPresent) {
      await AsyncStorage.removeItem("user");
    }
    const userString = await JSON.stringify(user);
    await AsyncStorage.setItem("user", userString);
  }
  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem("user");
  }

  const value = {
    user: user,
    isAuthenticated: !!user,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

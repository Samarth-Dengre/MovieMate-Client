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
  function authenticate(user) {
    setUser(user);
    const userIsPresent = AsyncStorage.getItem("user");
    if (userIsPresent) {
      AsyncStorage.removeItem("user");
    }
    const userString = JSON.stringify(user);
    AsyncStorage.setItem("user", userString);
  }
  function logout() {
    setUser(null);
    AsyncStorage.removeItem("user");
  }

  const value = {
    user: user,
    isAuthenticated: !!user,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

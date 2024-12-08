import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  // WHENEVER THE USER LOGS IN, THE USER'S INFORMATION IS STORED IN THIS STATE VARIABLE
  const [currentUser, setCurrentUser] = useState(null);

  // IF THE USER IS LOGGED IN, THEN THIS STATE VARIABLE IS SET TO TRUE OTHERWISE IT IS SET TO DEFAULT VALUE FALSE
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  // WHEN THE USER IS SUCCESSFULLY LOGGED IN, THIS FUNCTION IS CALLED AND USER'S INFORMATION IS STORED IN THE STATE VARIABLE
  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  // EXPOSE THESE VARIABLES TO THE CHILDREN
  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

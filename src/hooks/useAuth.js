import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalstorage";

// here i create a new context
const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  // define a state for a local variable  user
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  if (user === null) {
    navigate("/login");
  }

  const value = useMemo(
    () => ({
      user,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

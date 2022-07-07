import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [authed, setAuthed] = useState(false);

  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    setAuthed(true);
    navigate("/profile", { replace: true });
  };

  const logout = () => {
    setUser(null);
    setAuthed(false);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      authed,
      user,
      login,
      logout
    })
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

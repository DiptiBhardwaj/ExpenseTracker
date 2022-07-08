import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useDispatch} from "react-redux";
import { useLocation, Navigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [authed, setAuthed] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    setAuthed(true);
    dispatch({
      type: 'SET_USER_AUTHENTICATED',
      payload: true,
    });
    // navigate(`${location.state.path}`, { replace: true });

    navigate("/profile", { replace: true });
  };

  const logout = () => {
    setUser(null);
    setAuthed(false);
    dispatch({
      type: 'SET_USER_AUTHENTICATED',
      payload: false,
    });
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

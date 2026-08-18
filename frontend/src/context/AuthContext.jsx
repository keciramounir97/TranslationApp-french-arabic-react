import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("trad_token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("trad_token", token);
      // Charger le profil utilisateur
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          // En cas d'erreur ou jeton expiré
          localStorage.removeItem("trad_token");
          setToken("");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      localStorage.removeItem("trad_token");
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("trad_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

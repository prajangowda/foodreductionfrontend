import { createContext, useContext, useEffect, useState } from "react";

// create context
const AuthContext = createContext();

// helper to decode JWT (simple version)
const parseJwt = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔄 Restore user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = parseJwt(token);

      if (decoded) {
        setUser({
          email: decoded.sub,      // depends on your backend
          role: decoded.role       // must match your JWT payload
        });
      }
    }
  }, []);

  // 🔐 Login
  const loginUser = (data) => {
  localStorage.setItem("token", data.token);
  console.log("token", data.token);
  const decoded = parseJwt(data.token);

  if (decoded) {
    setUser({
      email: decoded.sub,
      role: decoded.role,
    });
  }
};

  // 🚪 Logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook to use auth easily
export const useAuth = () => useContext(AuthContext);
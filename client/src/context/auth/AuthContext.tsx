import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContext-hook";
import { useNavigate } from "react-router";

console.log("ENV FULL:", import.meta.env);
console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

interface User {
  email: string;
  companyName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<Response>;
  registerUser: (
    email: string,
    password: string,
    companyName: string
  ) => Promise<Response>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL
const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    console.log(email, password);
    console.log(BASE_URL);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if(!res.ok){
        throw new Error(result.message || "Registration failed");

      }


      navigate("/")

       localStorage.setItem("user", JSON.stringify({companyName: result.companyName, email: result.email}));
      localStorage.setItem("token", result.token);
      setUser(result.companyName);

      return result;
    } catch (err) {
      if(err instanceof Error){
        throw err
      }
      throw new Error("Login failed!")
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    companyName: string
  ) => {
    console.log(email, password, companyName);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, email, password }),
      });

      const res = await response.json();
      
    if(!response.ok){
        throw new Error(res.message || "Invalid register data")
      }
     
      navigate("/login")
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <AuthContext.Provider
      value={{ user, login, registerUser, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

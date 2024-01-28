"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: UserProps | null;
  logout: () => void;
  login: (userData: UserProps) => void;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  forceGetUserFromLocalStorage: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProps | null>(null);

  const forceGetUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  };

  // ESSA MISERA NÃO ATUALIZA
  useEffect(() => {
    forceGetUserFromLocalStorage();
  }, []);

  const login = (userData: UserProps) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const redirectDelay = setTimeout(() => {
      if (!user) {
        router.push("/login");
      }
    }, 500);

    return () => clearTimeout(redirectDelay);
  }, [user, router]);

  return (
    <AuthContext.Provider
      value={{ user, logout, login, setUser, forceGetUserFromLocalStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};

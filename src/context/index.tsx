"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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
  login: (userData: UserProps) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProps | null>(null);

  const login = (userData: UserProps) => {
    console.log("userData", userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      router.push("/calendar");
    }
  }, [user, router]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};

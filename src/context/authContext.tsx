"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/common/Loading";

// Define the context value type
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;  // Add loading state
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      console.log("Token:", token);
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Add the landing page to the exception list
        if (pathname !== "/auth/login" && pathname !== "/landing") {
          router.push("/auth/login");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname]); // Add pathname dependency

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    router.push("/admin");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

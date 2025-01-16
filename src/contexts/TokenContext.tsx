import React, { createContext, useContext, useState, ReactNode } from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  const clearToken = () => {
    setTokenState(null);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

'use client';
import { createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const AuthContext = createContext();

// Set provider
export function ProviderAuth({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', '');
  return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>;
}

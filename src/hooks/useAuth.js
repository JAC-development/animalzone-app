'use client';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

// Set provider
export function ProviderAuth({ children }) {
  const [userData, setUserData] = useState('Without user');
  return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>;
}

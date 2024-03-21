// sukurti authContext

import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext({
  login: (email: string) => {},
  logout: () => {},
  isUserLoggedIn: false,
  email: '',
});

// const valueCtx = {
//   login: (email: string) => null,
//   logout: () => null,
//   isUserLoggedIn: false,
//   email: '',
// };

type AuthProviderProps = {
  children: ReactNode;
};

// sukurti AuthProvider
export default function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState('');

  // const isUserLoggedIn = !!email;
  const isUserLoggedIn = Boolean(email);

  console.log('email Provide ctx ===', email);

  function login(email: string) {
    setEmail(email);
  }

  function logout() {
    setEmail('');
  }

  const value = {
    login,
    logout,
    isUserLoggedIn,
    email,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// contekxto naudojimo custom hook useAuthCtx()

export function useAuthCtx() {
  return useContext(AuthContext);
}

// export const useAuthCtx = () => useContext(AuthContext);

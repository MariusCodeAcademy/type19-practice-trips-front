// sukurti authContext

import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext({
  login: (email: string, userId: number) => {},
  logout: () => {},
  isUserLoggedIn: false,
  email: '',
  userId: 0,
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
  const [userId, setUserId] = useState(0);

  // const isUserLoggedIn = !!email;
  const isUserLoggedIn = Boolean(email);

  console.log('email Provide ctx ===', email);
  console.log('userId ===', userId);

  function login(email: string, id: number) {
    setEmail(email);
    setUserId(id);
  }

  function logout() {
    setEmail('');
  }

  const value = {
    login: login,
    logout: logout,
    isUserLoggedIn: isUserLoggedIn,
    email: email,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// contekxto naudojimo custom hook useAuthCtx()

export function useAuthCtx() {
  return useContext(AuthContext);
}

// export const useAuthCtx = () => useContext(AuthContext);

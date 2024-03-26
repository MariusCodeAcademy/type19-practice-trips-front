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
  const emailFromLocalStore = localStorage.getItem('tripEmail');
  const idFromLocalStore = localStorage.getItem('tripId');
  const [email, setEmail] = useState(emailFromLocalStore || '');
  const [userId, setUserId] = useState<number>(idFromLocalStore ? +idFromLocalStore : 0);

  // const isUserLoggedIn = !!email;
  const isUserLoggedIn = Boolean(email);

  // console.log('email Provide ctx ===', email);
  // console.log('userId ===', userId);

  function login(email: string, id: number) {
    setEmail(email);
    setUserId(id);
    localStorage.setItem('tripEmail', email);
    localStorage.setItem('tripId', id.toString());
  }

  function logout() {
    setEmail('');
    localStorage.removeItem('tripEmail');
    localStorage.removeItem('tripId');
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

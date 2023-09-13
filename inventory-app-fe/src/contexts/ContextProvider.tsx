import { createContext, useContext, useState, useCallback } from 'react';
import { IUser } from '../interfaces/user.interface';

interface StateContextProps {
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  token: string | null
  saveToken: (token: string | null) => void;
  removeToken: () => void;
}

const StateContext: React.Context<StateContextProps> = createContext<StateContextProps>({
  user: undefined,
  setUser: () => { },
  token: null,
  saveToken: () => { },
  removeToken: () => { }
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>({
    user_id: "1",
    name: "Bejo",
    email: "bejo_gantenk@mail.com",
    username: "gantenk",
    password: "password",
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));
  // const [token, setToken] = useState<string | null>("ACCESS_TOKEN");

  const saveToken = useCallback((_token: string | null) => {
    setToken(_token);
    if (_token) localStorage.setItem('ACCESS_TOKEN', _token);
    else localStorage.removeItem('ACCESS_TOKEN');
  }, []);

  const removeToken = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      saveToken,
      removeToken
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

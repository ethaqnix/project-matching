import React, { FunctionComponent, useEffect, useReducer } from "react";
import { AuthAction } from "./actions";
import { initialAuthState, AuthReducer, IAuthState } from "./reducer";
const AuthStateContext = React.createContext<IAuthState>(initialAuthState);

const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction>>(
  () => {}
);

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
};

export const useAuth = (): [IAuthState, React.Dispatch<AuthAction>] => {
  const stateContext = React.useContext(AuthStateContext);
  const dispatchContext = React.useContext<React.Dispatch<AuthAction>>(
    AuthDispatchContext
  );
  if (stateContext === undefined || dispatchContext === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return [stateContext, dispatchContext];
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}: any) => {
  const [value, dispatch] = useReducer(AuthReducer, initialAuthState);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8080/users/myself", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const passport = await result.json();

      dispatch({ type: "SET_PASSPORT", payload: passport });
    };
    fetchData();
  }, []);

  return (
    <AuthStateContext.Provider value={value}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

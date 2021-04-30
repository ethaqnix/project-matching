import React, { useReducer } from "react";
import { AuthAction } from "./actions";
import { initialAuthState, AuthReducer, IAuthState } from "./reducer";

const AuthStateContext = React.createContext<IAuthState>(initialAuthState);
const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction> | null>(
  null
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

export const useAuth = (): [IAuthState, React.Dispatch<AuthAction> | null] => {
  const stateContext = React.useContext(AuthStateContext);
  const dispatchContext = React.useContext(AuthDispatchContext);
  if (stateContext === undefined || dispatchContext === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return [stateContext, dispatchContext];
};

export const AuthProvider: any = ({ children }: any) => {
  const [value, dispatch] = useReducer(AuthReducer, initialAuthState);

  return (
    <AuthStateContext.Provider value={value}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

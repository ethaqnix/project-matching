import React, { FunctionComponent, useEffect, useReducer } from "react";
import { getUser } from "../../api/users";
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
  initialState?: Partial<AuthProviderProps>;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
  initialState,
}: any) => {
  const [value, dispatch] = useReducer(AuthReducer, {
    ...initialState,
    ...initialAuthState,
  });

  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async (id: string) => {
      const passport = await getUser(id);
      dispatch({
        type: "LOGIN",
        payload: passport,
      });
      dispatch({ type: "SET_SIGNIN_CURRENTLY_LOADING", payload: false });
    };
    const user = localStorage.getItem("user");
    if (user) {
      fetchData(user);
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [currentUser]);

  return (
    <AuthStateContext.Provider value={value}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

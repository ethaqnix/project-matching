import { Redirect, Route } from "react-router-dom";

import SecuredRoute from "./SecuredRoute";

import React, { FunctionComponent } from "react";
import { IRoute } from "./routes";
import { useAuthState } from "../contexts/authContext";

type OwnProps = IRoute;

const AppRoutes: FunctionComponent<OwnProps> = ({
  component: Component,
  path,
  isPrivate,
  title,
  onMenu,
}) => {
  const { connected, loading } = useAuthState();
  if (!connected && loading) return null;
  return (
    <Route
      path={path}
      render={() =>
        isPrivate && !Boolean(connected) ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <SecuredRoute
            component={Component}
            isPrivate={isPrivate}
            title={title}
            path={path}
            onMenu={onMenu}
          />
        )
      }
    />
  );
};

export default AppRoutes;

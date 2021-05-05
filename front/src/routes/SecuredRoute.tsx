import React, { FunctionComponent } from "react";
import Page from "../layout/Page";
import { IRoute } from "./routes";

type OwnProps = IRoute;

const SecuredRoute: FunctionComponent<OwnProps> = ({
  component: Component,
  title,
  isPrivate,
  onMenu,
  ...rest
}) => {
  return (
    <Page title={title} onMenu={onMenu}>
      <Component {...rest} />
    </Page>
  );
};

export default SecuredRoute;

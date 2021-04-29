import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import Header from "./Header";

const useStyles = makeStyles((theme: Theme) => ({
  appContent: { display: "flex", flexGrow: 1, backgroundColor: "aliceblue" }
}));

type OwnProps = {
  title: string;
  children: React.ReactNode;
};

const Page: FunctionComponent<OwnProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header title={title} />
      <div
        className={classes.appContent}
      >
        {children}
      </div>
    </div>
  );
};

export default Page;

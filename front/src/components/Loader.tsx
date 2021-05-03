import { CircularProgress, makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    textAlign: "center",
  },
}));

type OwnProps = {};

const Loader: FunctionComponent<OwnProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default Loader;

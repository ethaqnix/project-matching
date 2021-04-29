import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";

type OwnProps = {};

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: { height: 50, backgroundColor: theme.palette.primary.main },
  };
});

const Footer: FunctionComponent<OwnProps> = ({}) => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default Footer;

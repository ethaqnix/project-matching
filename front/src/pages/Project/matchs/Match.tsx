import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { IMatch } from "../../../interfaces";

const useStyles = makeStyles((theme: Theme) => ({}));

type OwnProps = {
  match: IMatch;
};

const Match: FunctionComponent<OwnProps> = ({ match }) => {
  const classes = useStyles();
  return <>match</>;
};

export default Match;

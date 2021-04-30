import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { IMatch } from "../../../interfaces";
import Match from "./Match";

const useStyles = makeStyles((theme: Theme) => ({}));

type OwnProps = {
  matchs: Array<IMatch>;
};

const Matchs: FunctionComponent<OwnProps> = ({ matchs }) => {
  const classes = useStyles();
  return (
    <>
      {matchs.map((match) => (
        <Match match={match} />
      ))}
    </>
  );
};

export default Matchs;

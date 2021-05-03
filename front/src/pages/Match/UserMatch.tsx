import { makeStyles, Paper, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useAuthState } from "../../contexts/authContext";
import { IMatch } from "../../interfaces";
import MatchingPercentage from "./MatchingPercentage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  percentageView: {
    padding: theme.spacing(1),
  },
}));

interface OwnProps {
  user: IMatch;
}

const UserMatch: FunctionComponent<OwnProps> = ({ user }) => {
  const classes = useStyles();
  const { passport } = useAuthState();
  if (!passport) return null;
  const { firstName, lastName, skills } = user;

  return (
    <Paper elevation={1} className={classes.root}>
      <div className={classes.percentageView}>
        <MatchingPercentage
          percentage={(skills.length / passport.needs.length) * 100}
        />
      </div>
      <div>
        <div> {`${firstName} ${lastName}`}</div>
        <div>
          {skills.reduce(
            (line: string, skill: string, i: number) =>
              i === 0 ? skill : `${line}, ${skill}`,
            ""
          )}
        </div>
      </div>
    </Paper>
  );
};

export default UserMatch;

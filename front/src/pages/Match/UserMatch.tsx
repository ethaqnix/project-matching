import { Typography } from "@material-ui/core";
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
  const { firstName, lastName, skills, projects } = user;

  return (
    <Paper elevation={1} className={classes.root}>
      <div className={classes.percentageView}>
        <MatchingPercentage
          percentage={(skills.length / passport.needs.length) * 100}
        />
      </div>
      <div>
        <div>
          <Typography variant="subtitle1">
            {`${firstName} ${lastName}`}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2">Compétence(s) : </Typography>
          <Typography variant="caption">
            {skills.reduce(
              (line: string, skill: string, i: number) =>
                i === 0 ? skill : `${line}, ${skill}`,
              ""
            )}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2">Projet(s) : </Typography>
          <Typography variant="caption">
            {projects.reduce(
              (line: string, skill: string, i: number) =>
                i === 0 ? skill : `${line}, ${skill}`,
              ""
            )}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default UserMatch;

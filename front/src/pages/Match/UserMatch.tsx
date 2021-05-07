import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles, Paper, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { contactUser } from "../../api/users";
import { useAuth } from "../../contexts/authContext";
import { patchUserPassport } from "../../contexts/authContext/actions";
import { IMatch } from "../../interfaces";
import MatchingPercentage from "./MatchingPercentage";

const useStyles = makeStyles((theme: Theme) => ({
  percentageView: {
    padding: theme.spacing(1),
  },
  contactButton: {},
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

interface OwnProps {
  user: IMatch;
  contacted: boolean;
}

const UserMatch: FunctionComponent<OwnProps> = ({ user, contacted }) => {
  const classes = useStyles();
  const [{ passport }, setAuth] = useAuth();
  if (!passport) return null;
  const { firstName, lastName, skills, projects, _id } = user;

  const handleContactUser = async () => {
    contactUser(_id);
    patchUserPassport(setAuth, { contacts: [...passport.contacts, _id] });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <MatchingPercentage
              percentage={(skills.length / passport.needs.length) * 100}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {`${firstName} ${lastName}`}
                </Typography>
                <Typography variant="subtitle2">Compétence(s) : </Typography>
                <Typography variant="caption">
                  {skills.reduce(
                    (line: string, skill: string, i: number) =>
                      i === 0 ? skill : `${line}, ${skill}`,
                    ""
                  )}
                </Typography>
                <Typography variant="subtitle2">Projet(s) : </Typography>
                <Typography variant="caption">
                  {projects.reduce(
                    (line: string, skill: string, i: number) =>
                      i === 0 ? skill : `${line}, ${skill}`,
                    ""
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleContactUser}
                disabled={contacted}
              >
                <Typography variant="subtitle1">
                  {contacted ? "CONTACTED" : "CONTACT"}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserMatch;

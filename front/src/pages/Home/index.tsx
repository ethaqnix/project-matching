import {
  Container,
  Paper,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import React, { FunctionComponent } from "react";
import Match from "../Match";
import PersonalInformations from "./PersonalInformations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),

      flexGrow: 1,
    },
    paper: {
      margin: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

type OwnProps = {};

const Home: FunctionComponent<OwnProps> = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <PersonalInformations />
      </Paper>
      <Paper elevation={2} className={classes.paper}>
        <Match />
      </Paper>
    </Container>
  );
};

export default Home;

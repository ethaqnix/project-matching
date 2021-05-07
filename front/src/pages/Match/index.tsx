import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useAuthState } from "../../contexts/authContext/context";
import { IMatch } from "../../interfaces";
import UserMatch from "./UserMatch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),

      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);
type OwnProps = {};

const Match: FunctionComponent<OwnProps> = () => {
  const classes = useStyles();
  const [match, setMatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [includeContacts, setIncludeContacts] = useState(true);
  const { passport } = useAuthState();
  const { needs } = passport || {};

  useEffect(() => {
    setMatch([]);
  }, [needs]);

  const handleMatchClick = async () => {
    setLoading(true);
    const result = await fetch(
      `http://localhost:8080/match/${passport ? passport!._id : ""}?contacts=${
        includeContacts ? 1 : 0
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authorization") || "",
        },
      }
    );
    const matchResponse = await result.json();
    setMatch(matchResponse);
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={handleMatchClick}>GET MY MATCH</Button>
        <FormControlLabel
          control={
            <Switch
              checked={includeContacts}
              onChange={(e) => setIncludeContacts(e.target.checked)}
              name="Include contacts"
              color="primary"
            />
          }
          label="Include contacts"
        />
      </div>
      {loading && <Loader />}
      {!!match.length &&
        match.map((user: IMatch) => {
          return (
            <UserMatch
              key={`match_${user._id}`}
              user={user}
              contacted={
                !!passport?.contacts.find((contact) => contact === user._id)
              }
            />
          );
        })}
    </div>
  );
};

export default Match;

import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
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
  const [loading, setLoading] = useState(true);
  const { passport } = useAuthState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:8080/match/${passport ? passport!._id : ""}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const matchResponse = await result.json();
      setLoading(false);
      setMatch(matchResponse);
    };

    if (passport && passport._id) fetchData();
  }, [passport]);

  const handleMatchClick = async () => {
    setLoading(true);
    const result = await fetch(
      `http://localhost:8080/match/${passport ? passport!._id : ""}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const matchResponse = await result.json();
    setMatch(matchResponse);
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleMatchClick}>test</Button>

      {loading && <Loader />}
      {match.length && match.map((user: IMatch) => <UserMatch user={user} />)}
    </div>
  );
};

export default Match;

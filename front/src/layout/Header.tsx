import { Button, makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { logout, useAuthDispatch } from "../contexts/authContext";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

type OwnProps = {
  title: string;
};

const Header: FunctionComponent<OwnProps> = ({ title }) => {
  const setAuth = useAuthDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    logout(setAuth);
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

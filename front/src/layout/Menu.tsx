import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import routes from "../routes/routes";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  hide: {
    display: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [{ isOpen }, setState] = React.useState({
    isOpen: false,
  });
  const history = useHistory();
  const connected = false;
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ isOpen: open });
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        className={clsx(classes.menuButton, isOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {routes
              .filter(
                ({ isPrivate, onMenu }) => onMenu && (!isPrivate || connected)
              )
              .map(({ title, path }: any) => (
                <ListItem
                  button
                  key={title}
                  onClick={() => {
                    history.push(path);
                  }}
                >
                  <ListItemText primary={title} />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}

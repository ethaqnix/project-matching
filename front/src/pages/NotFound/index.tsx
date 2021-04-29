

import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		minHeight: "100vh",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
	}
}));

type OwnProps = {};

const NotFound: FunctionComponent<OwnProps> = () => {
  const classes = useStyles();
  return (<div className={classes.container}>
	<h1>Page not found</h1>
</div>
);
};

export default NotFound

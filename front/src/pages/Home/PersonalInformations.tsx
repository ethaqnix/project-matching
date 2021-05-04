import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useAuthState } from "../../contexts/authContext";

const useStyles = makeStyles((theme: Theme) => ({
  bold: {
    fontWeight: 600,
  },
  line: {
    display: "flex",
  },
}));

type OwnProps = {};

const PersonalInformations: FunctionComponent<OwnProps> = () => {
  const { passport } = useAuthState();

  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" className={classes.line}>
        <div className={classes.bold}>First name :</div>
        {`${passport?.firstName}`}
      </Typography>
      <Typography variant="h6" className={classes.line}>
        <div className={classes.bold}>Last name :</div>
        {`${passport?.lastName}`}
      </Typography>
    </div>
  );
};

export default PersonalInformations;

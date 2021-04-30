import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/context";

const useStyles = makeStyles((theme: Theme) => ({}));

type OwnProps = {};

const ProjectView: FunctionComponent<OwnProps> = ({}) => {
  const classes = useStyles();
  const [project, setProject] = useState(null);
  const [{ passport }, setAuth] = useAuth();
  console.log(passport);

  useEffect(() => {
    const fetchData = async (id: string) => {
      const result = await fetch(
        "http://localhost:8080/projects/00000401d44e9311246ea3ad",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      console.log(result);
      console.log(await result.json());

      //setProject(result);
    };

    fetchData("00000401d44e9311246ea3ad");
  }, [passport]);

  return <></>;
};

export default ProjectView;

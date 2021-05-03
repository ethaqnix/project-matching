import { Box, CircularProgress, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";

type OwnProps = {
  percentage: number;
};

const MatchingPercentage: FunctionComponent<OwnProps> = ({ percentage }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={percentage} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default MatchingPercentage;

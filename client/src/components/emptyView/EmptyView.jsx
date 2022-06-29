import React from "react";
import "./EmptyView.css";
import empty from "../../images/empty.gif";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Grid } from "@mui/material";

export default function EmptyView() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "50vh" }}
    >
      <Grid item xs={3}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Grid>
    </Grid>
  );
}

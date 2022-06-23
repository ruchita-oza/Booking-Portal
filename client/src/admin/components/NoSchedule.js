import React from "react";
import { Card, Typography, Grid, CardContent } from "@mui/material";
function NoRecord() {
  return (
    <div>
      {" "}
      <Card
        // variant="outlined"
        style={{ border: "none", boxShadow: "none" }}
        // sx={{
        //   boxShadow: 3,
        // }}
      >
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5">
              <b>NO SCHEDULE FOUND</b>
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoRecord;

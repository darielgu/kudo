import React from "react";
import {
  AppBar,
  Grid,
  Typography,
  Toolbar,
  Tooltip,
  CssBaseline,
} from "@mui/material";
function Navigation() {
  return (
    <>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "black" }} position="relative">
        <Grid container spacing={0}>
          <Grid>
            <Toolbar>KudoBoard</Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

export default Navigation;

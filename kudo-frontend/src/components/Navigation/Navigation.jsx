import React from "react";
import {
  AppBar,
  Grid,
  Typography,
  Toolbar,
  Tooltip,
  CssBaseline,
  Button,
} from "@mui/material";
function Navigation() {
  return (
    <>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "white" }} position="relative">
        <Grid
          container
          spacing={0}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid>
            <Toolbar sx={{ color: "black" }}>KudoBoard</Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

export default Navigation;

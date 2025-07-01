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
import Sticky from "@mui/icons-material/StickyNote2";
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
            <Toolbar
              sx={{
                color: "black",
                background: "clear",
                p: 0,
                height: 2,
              }}
            >
              KudoBoard <Sticky />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

export default Navigation;

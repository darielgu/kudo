import React from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
const FilterButtons = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={2}
        my={3}
      >
        <Grid>
          <Button variant="contained">Home</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Recent</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Celebration</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Thank You</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Inspiration</Button>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} sx = {{ mt: 5, mb: 3}}>
        <Button
          variant = "outlined"
          // onClick = {() => setBoardModalOpen(true)} TODO - 
        >
          Create Board
        </Button>
      </Grid>
    </Container>
  );
};

export default FilterButtons;

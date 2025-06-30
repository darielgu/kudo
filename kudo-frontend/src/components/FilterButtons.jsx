import React, { useState } from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
const FilterButtons = ({ onFilterChange }) => {
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
          <Button
            id="all"
            onClick={(e) => onFilterChange(e.target.id)}
            variant="contained"
          >
            All
          </Button>
        </Grid>
        <Grid>
          <Button
            id="recent"
            onClick={(e) => onFilterChange(e.target.id)}
            variant="contained"
          >
            Recent
          </Button>
        </Grid>
        <Grid>
          <Button
            id="celebration"
            onClick={(e) => onFilterChange(e.target.id)}
            variant="contained"
          >
            Celebration
          </Button>
        </Grid>
        <Grid>
          <Button
            id="thankYou"
            onClick={(e) => onFilterChange(e.target.id)}
            variant="contained"
          >
            Thank You
          </Button>
        </Grid>
        <Grid>
          <Button
            id="inspiration"
            onClick={(e) => onFilterChange(e.target.id)}
            variant="contained"
          >
            Inspiration
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} sx={{ mt: 5, mb: 3 }}></Grid>
    </Container>
  );
};

export default FilterButtons;

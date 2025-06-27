import React from "react";
import { Container, Grid } from "@mui/material";
import MediaCard from "../MediaCard";
import { useState } from "react";

const HomePage = () => {
  // Going to make an API call to the database holding Kudo Board information and map through for each data object
  const [boards, setBoards] = useState([]);

  // going to need a useEffect method here to populate kudo cards

  return (
    <>
      <Container sx={{ my: 8 }}>
        <Grid
          container
          direction={"row"}
          spacing={10}
          justifyContent={"center"}
        >
          <MediaCard
            url="https://storage.googleapis.com/website-production/uploads/2017/10/stock-photo-guide-cheesy-celebration.jpg"
            title="stock card"
            description="lorem"
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

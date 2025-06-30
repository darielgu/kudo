import React, { useEffect } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import MediaCard from "../MediaCard";
import { useState } from "react";
import axios from "axios";
import CardModal from "../Modal/CardModal";
import HomeModal from "../Modal/HomeModal";
const HomePage = ({ onBoardClick }) => {
  // Going to make an API call to the database holding Kudo Board information and map through for each data object
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Going to make an API call to the database holding Kudo Board information and map through for each data object
    try {
      axios.get("http://localhost:3001/boards").then((response) => {
        setBoards(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  }, []);

  function setClose() {
    // prop to send modal for closing modal
    setOpen(false);
  }
  return (
    <>
      <Container
        sx={{
          my: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Button
          variant="outlined"
          sx={{ width: 300, mb: 4 }}
          onClick={() => setOpen(true)}
        >
          Create card
        </Button>

        <HomeModal open={open} handleClose={setClose} />
        <Grid
          container
          direction={"row"}
          spacing={10}
          justifyContent={"center"}
        >
          {/* display boards through a map */}

          <MediaCard
            url="https://storage.googleapis.com/website-production/uploads/2017/10/stock-photo-guide-cheesy-celebration.jpg"
            title="stock card"
            description="lorem"
            onBoardClick={onBoardClick} // TODO - change this later to pass in board data
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

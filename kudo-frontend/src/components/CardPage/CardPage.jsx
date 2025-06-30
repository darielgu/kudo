import React from "react";
import { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import BoardCard from "../BoardCard";
import CardModal from "../Modal/CardModal";

const CardPage = ({ boardId, boardTitle, onBackToHome }) => {
  // set cards useState
  const [cards, setCards] = useState([]);
  // TODO - fetch cards from api, set cards useState to an array of cards
  // TODO - display cards in a grid
  // fetch cards from api, set cards useState to an array of cards
  //   useEffect(() => {
  //    try{
  //      axios.get(`http://localhost:3001/cards/${boardId}`)
  //       .then((response) => response.json())
  //       .then((data) => setCards(data));
  //    } catch (error) {
  //      console.error("Error fetching cards:", error);
  //    }
  //   }, []);

  return (
    <>
      <Container sx={{ my: 8 }}>
        {/* back to home button */}
        <Grid container justifyContent="space-between" sx={{ mb: 4 }}>
          <Button variant="outlined" onClick={() => onBackToHome()}>
            {" "}
            Back to Home{" "}
          </Button>
        </Grid>
        <Typography variant="h4" sx={{ mb: 4 }} textAlign="center">
          {boardTitle}
        </Typography>

        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          {" "}
          {/* mb for margin-bottom to separate from cards */}
          {/* <Button variant="contained">Create</Button> */}
          <CardModal />
        </Grid>
        <Grid
          container
          direction={"row"}
          spacing={10}
          justifyContent={"center"}
        >
          {/* display cards linked to selected board */}
          <BoardCard
            url="https://static01.nyt.com/images/2020/09/25/sports/25soccer-nationalWEB1/merlin_177451008_91c7b66d-3c8a-4963-896e-54280f374b6d-superJumbo.jpg"
            title="stock card"
            description="lorem"
          />
        </Grid>
      </Container>
    </>
  );
};

export default CardPage;

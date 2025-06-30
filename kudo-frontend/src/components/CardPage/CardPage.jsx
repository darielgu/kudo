import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import BoardCard from "../BoardCard";
import CardModal from "../Modal/CardModal";
import axios from "axios";

const CardPage = ({ boardId, boardTitle, onBackToHome }) => {
  // set cards useState
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState(new Set());

  // fetch cards from API, set cards useState to array of cards
  useEffect(() => {
    // will fetch ALL cards, no route for specific cards
    const fetchAllCards = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/card/`)
        
        // filter cards by boardID
        const boardCards = response.data.filter(card => card.board_id == parseInt(boardId));
        console.log('cards for this board: ', boardCards)

        setCards(boardCards)

      } catch (error) {
        console.error("Error fetching cards: ", error)
      }
    }

    fetchAllCards();

  }, [boardId, cards]); // refereshed by boardID

  // update like functionality => send put response to DB
  const addLike = async (cardId) => {
    try {
      const currentCard = cards.find(card => card.id === cardId);
      const hasLiked = likedCards.has(cardId);
      
      // Calculate new likes count
      const newLikes = hasLiked 
        ? Math.max((currentCard?.likes || 0) - 1, 0) // Unlike: decrease (but not below 0)
        : (currentCard?.likes || 0) + 1; // Like: increase

      // PUT response with new likes count
      const response = await axios.put(`http://localhost:3000/card/${cardId}`, {
        likes: newLikes
      });

      // Update local state
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === cardId 
            ? { ...card, likes: newLikes }
            : card
        )
      );

      // Update liked cards tracking
      setLikedCards(prev => {
        const newSet = new Set(prev);
        if (hasLiked) {
          newSet.delete(cardId); // Remove from liked
        } else {
          newSet.add(cardId); // Add to liked
        }
        return newSet;
      });

    } catch (error) {
      console.error(error);
    }
  };


  // DELETE card function
  const deleteCard =  async (cardId) => {
    try {
      // send DELETE request to backend
      await axios.delete(`http://localhost:3000/card/${cardId}`);
      console.log("Card deleted successfully")

      // remove card from local state
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));

      // also remove from liked cards if it was liked
      setLikedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    } catch (error) {
      console.error(error)
    }
  }


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
          <CardModal 
          boardId={boardId}
          
          />
        </Grid>
        <Grid
          container
          direction={"row"}
          spacing={10}
          justifyContent={"center"}
        >
          {/* display cards linked to selected board, map the cards */}
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <BoardCard
              url={card.image_url}
              title={card.message}
              description={card.author}
              likes = {card.likes}
              id = {card.id}
              onUpVote = {addLike}
              isLiked={likedCards.has(card.id)} // pass whether has user liked this card
              deleteCard={deleteCard}
            />
          </Grid>
        ))}
        </Grid>
      </Container>
    </>
  );
};

export default CardPage;

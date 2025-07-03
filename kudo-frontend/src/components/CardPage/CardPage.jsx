import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import BoardCard from "../BoardCard";
import CardModal from "../Modal/CardModal";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext.jsx";

const CardPage = ({ boardId, boardTitle, onBackToHome }) => {
  // set cards useState
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState(new Set());
  const { isDarkMode } = useTheme();

  // Get pinned cards from localStorage
  const getPinnedCards = () => {
    const pinned = localStorage.getItem(`pinned_cards_${boardId}`);
    return pinned ? JSON.parse(pinned) : {};
  };

  // Save pinned cards to localStorage
  const savePinnedCards = (pinnedCards) => {
    localStorage.setItem(`pinned_cards_${boardId}`, JSON.stringify(pinnedCards));
  };

  // fetch cards from API, set cards useState to array of cards
  const fetchAllCards = async () => {
    try {
      const response = await axios.get(`https://kudo-backend-3vyv.onrender.com/card/`);

      // filter cards by boardID
      const boardCards = response.data.filter(
        (card) => card.board_id == parseInt(boardId)
      );
      
      // Add pinned status from localStorage
      const pinnedCards = getPinnedCards();
      const cardsWithPinnedStatus = boardCards.map(card => ({
        ...card,
        pinned: pinnedCards[card.id]?.pinned || false,
        pinned_at: pinnedCards[card.id]?.pinned_at || null
      }));

      // Sort: pinned first (most recent pinned_at first), then unpinned by id desc
      const sortedCards = cardsWithPinnedStatus.sort((a, b) => {
        if (a.pinned && b.pinned) {
          return new Date(b.pinned_at) - new Date(a.pinned_at);
        } else if (a.pinned) {
          return -1;
        } else if (b.pinned) {
          return 1;
        } else {
          return b.id - a.id;
        }
      });

      console.log("cards for this board: ", sortedCards);
      setCards(sortedCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, [boardId]); // Only refresh when boardId changes, not when cards change

  // update like functionality => send put response to DB
  const addLike = async (cardId) => {
    try {
      const currentCard = cards.find((card) => card.id === cardId);
      const hasLiked = likedCards.has(cardId);

      // Calculate new likes count
      const newLikes = hasLiked
        ? Math.max((currentCard?.likes || 0) - 1, 0) // Unlike: decrease (but not below 0)
        : (currentCard?.likes || 0) + 1; // Like: increase

      // PUT response with new likes count
      const response = await axios.put(`https://kudo-backend-3vyv.onrender.com/card/${cardId}`, {
        likes: newLikes,
      });

      // Update local state
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, likes: newLikes } : card
        )
      );

      // Update liked cards tracking
      setLikedCards((prev) => {
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
  const deleteCard = async (cardId) => {
    try {
      // send DELETE request to backend
      await axios.delete(`https://kudo-backend-3vyv.onrender.com/card/${cardId}`);
      console.log("Card deleted successfully");

      // remove card from local state
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

      // also remove from liked cards if it was liked
      setLikedCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cardId);
        return newSet;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Pin/unpin card using localStorage
  const togglePin = (cardId) => {
    const pinnedCards = getPinnedCards();
    const currentCard = cards.find(card => card.id === cardId);
    const isPinned = currentCard?.pinned || false;
    
    if (isPinned) {
      // Unpin: remove from pinned cards
      delete pinnedCards[cardId];
    } else {
      // Pin: add to pinned cards with timestamp
      pinnedCards[cardId] = {
        pinned: true,
        pinned_at: new Date().toISOString()
      };
    }
    
    savePinnedCards(pinnedCards);
    
    // Update local state
    setCards((prevCards) => {
      const newCards = prevCards.map(card => 
        card.id === cardId 
          ? { 
              ...card, 
              pinned: !isPinned, 
              pinned_at: isPinned ? null : new Date().toISOString() 
            }
          : card
      );
      
      // Sort: pinned first (most recent pinned_at first), then unpinned by id desc
      return newCards.sort((a, b) => {
        if (a.pinned && b.pinned) {
          return new Date(b.pinned_at) - new Date(a.pinned_at);
        } else if (a.pinned) {
          return -1;
        } else if (b.pinned) {
          return 1;
        } else {
          return b.id - a.id;
        }
      });
    });
  };

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
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", color: isDarkMode ? "#fff" : undefined }}
        >
          {boardTitle}
        </Typography>

        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          {" "}
          {/* mb for margin-bottom to separate from cards */}
          {/* <Button variant="contained">Create</Button> */}
          <CardModal boardId={boardId} onCardCreated={fetchAllCards} />
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
                likes={card.likes}
                id={card.id}
                onUpVote={addLike}
                isLiked={likedCards.has(card.id)} // pass whether has user liked this card
                deleteCard={deleteCard}
                pinned={card.pinned}
                onPin={togglePin}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CardPage;

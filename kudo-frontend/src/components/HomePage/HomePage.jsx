import React, { useEffect } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import MediaCard from "../MediaCard";
import { useState } from "react";
import axios from "axios";
import FilterButtons from "../FilterButtons";
import HomeModal from "../Modal/HomeModal";
const HomePage = ({ onBoardClick }) => {
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (newFilter) => {
    // handle getting a filter from the FilterButtons component
    setFilter(newFilter);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/board"); // Code "pauses" here until the Promise resolves
        setBoards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, [boards]);

  useEffect(() => {
    // whenever filter changes we need to sort our boards
    if (!filter) return;

    console.log(filter);
  }, [filter]);

  async function onBoardDelete(id) {
    // prop-func to pass into cardMedia for deleting a board
    try {
      await axios.delete(`http://localhost:3000/board/${id}`);
      // instead of window reload, just setBoards prev.filter removing the id
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  function setClose() {
    // prop to send modal for closing modal
    setOpen(false);
  }
  return (
    <>
      <FilterButtons onFilterChange={handleFilterChange} />
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
          {boards.map((board, index) => {
            return (
              <MediaCard
                url={board.image_url}
                title={board.title}
                description={board.description}
                id={board.id}
                key={board.id}
                onBoardClick={onBoardClick} // TODO - change this to pass in board data to Card Page view
                onBoardDelete={onBoardDelete}
                date={board.created_at}
              />
            );
          })}

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

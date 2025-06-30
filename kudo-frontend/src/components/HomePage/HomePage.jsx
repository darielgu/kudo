import React, { useEffect } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import MediaCard from "../MediaCard";
import { useState } from "react";
import axios from "axios";
import FilterButtons from "../FilterButtons";
import HomeModal from "../Modal/HomeModal";
import SearchBar from "../SearchBar";
const HomePage = ({ onBoardClick }) => {
  const [boards, setBoards] = useState([]);
  const [masterBoards, setMasterBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState(null);
  const handleFilterChange = (newFilter) => {
    // handle getting a filter from the FilterButtons component
    setFilter(newFilter);
  };
  const handleTextChange = (newSearch) => {
    // handle getting the search value from search bar
    setSearch(newSearch);
    if (newSearch != null && newSearch != "") {
      const masterClone = structuredClone(masterBoards);
      const filteredSearch = masterClone.filter((board) =>
        board.title.toLowerCase().includes(newSearch.toLowerCase())
      );
      setBoards(filteredSearch);
    } else {
      setBoards(masterBoards);
    }
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/board"); // Code "pauses" here until the Promise resolves
        const sortedBoards = response.data.sort((a, b) => {
          // auto set board in descending by creation date
          return new Date(b.created_at) - new Date(a.created_at);
        });
        // setBoards(response.data);
        setBoards(sortedBoards);
        setMasterBoards(response.data); // the master state of the boards -- never change

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    // whenever filter changes we need to sort our boards
    if (!filter) return;
    if (filter === "recent") {
      const masterClone = structuredClone(masterBoards);
      setBoards(masterClone.slice(0, 6)); // just render 6
    } else if (filter === "celebration") {
      const masterClone = structuredClone(masterBoards); // make a deep clone of the master boards and filter from them
      const celebrationBoards = masterClone.filter((board) => {
        return board.category === "celebration";
      });
      setBoards(celebrationBoards);
    } else if (filter === "thankYou") {
      const masterClone = structuredClone(masterBoards);
      const thankYouBoards = masterClone.filter((board) => {
        return board.category === "thankYou";
      });
      setBoards(thankYouBoards);
    } else if (filter === "inspiration") {
      const masterClone = structuredClone(masterBoards);
      const inspirationBoards = masterClone.filter((board) => {
        return board.category === "inspiration";
      });
      setBoards(inspirationBoards);
    } else if (filter === "all") {
      setBoards(masterBoards);
    }
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
      <SearchBar textChange={handleTextChange} />
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

          {/* <MediaCard
            url="https://storage.googleapis.com/website-production/uploads/2017/10/stock-photo-guide-cheesy-celebration.jpg"
            title="stock card"
            description="lorem"
            onBoardClick={onBoardClick} // TODO - change this later to pass in board data
          /> */}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

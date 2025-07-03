import React, { useEffect, useContext } from "react";
import { Button, Container, Grid } from "@mui/material";
import MediaCard from "../MediaCard";
import { useState } from "react";
import axios from "axios";
import FilterButtons from "../FilterButtons";
import HomeModal from "../Modal/HomeModal";
import SearchBar from "../SearchBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "../../context/ThemeContext.jsx";

const HomePage = ({ onBoardClick }) => {
  const [boards, setBoards] = useState([]);
  const [masterBoards, setMasterBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState(null);
  const { colors, shadows } = useTheme();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleTextChange = (newSearch) => {
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
        const response = await axios.get("http://localhost:3000/board");
        const sortedBoards = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setBoards(sortedBoards);
        setMasterBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    if (!filter) return;
    if (filter === "recent") {
      const masterClone = structuredClone(masterBoards);
      setBoards(masterClone.slice(0, 6));
    } else if (filter === "celebration") {
      const masterClone = structuredClone(masterBoards);
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
  }, [filter, masterBoards]);

  async function onBoardDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/board/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  function setClose() {
    setOpen(false);
  }

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: colors.primary,
      },
      background: {
        default: colors.background,
        paper: colors.card,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: colors.card,
            minHeight: 56,
            borderRadius: 2,
          },
          notchedOutline: {
            borderColor: '#3b82f6',
          },
          input: {
            color: colors.text,
            padding: '18.5px 14px',
            '&::placeholder': {
              color: colors.textSecondary,
              opacity: 1,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderColor: colors.primary,
            color: colors.primary,
            fontWeight: 500,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: colors.mode === 'dark' ? colors.primary : 'rgba(59,130,246,0.08)',
              color: colors.primary,
              borderColor: colors.primary,
            },
            '&.Mui-disabled': {
              borderColor: colors.primary,
              color: colors.textSecondary,
              opacity: 0.5,
            },
          },
          contained: {
            backgroundColor: colors.primary,
            color: 'white',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: colors.mode === 'dark' ? '#2563eb' : '#2563eb',
              color: 'white',
            },
            '&.Mui-disabled': {
              backgroundColor: colors.primary,
              color: colors.textSecondary,
              opacity: 0.5,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className="root">
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <SearchBar textChange={handleTextChange} />
            <FilterButtons onFilterChange={handleFilterChange} />
            
            <Container
              sx={{
                my: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: colors.text,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  mb: 4,
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 500,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  boxShadow: shadows.small,
                  '&:hover': {
                    backgroundColor: colors.primary,
                    boxShadow: shadows.medium,
                  },
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setOpen(true)}
              >
                Create New Board
              </Button>

              <HomeModal open={open} handleClose={setClose} />
              
              <Grid
                container
                direction={"row"}
                spacing={3}
                justifyContent={"center"}
              >
                {boards.map((board, index) => (
                  <MediaCard
                    key={board.id}
                    board={board}
                    url={board.image_url}
                    title={board.title}
                    description={board.description}
                    id={board.id}
                    onBoardClick={onBoardClick}
                    onBoardDelete={onBoardDelete}
                    date={board.created_at}
                  />
                ))}
              </Grid>
            </Container>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
};

export default HomePage;

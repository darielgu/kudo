import { useState } from "react";
import "./App.css";
import FilterButtons from "./components/FilterButtons";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import CardPage from "./components/CardPage/CardPage";
import SearchBar from "./components/SearchBar";

function App() {
  // selected board useState
  const [selectedBoard, setSelectedBoard] = useState(null);

  // when view button is clicked, set selected board to the board that was clicked
  const handleBoardClick = (board) => {
    setSelectedBoard(board);
  };

  // when back to home button is clicked, set selected board to null
  const handleBackToHome = () => {
    setSelectedBoard(null);
  };

  return (
    <>
      <Navigation />
      {selectedBoard === null ? (
        <>
          <SearchBar />
          <HomePage onBoardClick={handleBoardClick} />
        </>
      ) : (
        <CardPage
          boardId={selectedBoard.id}
          boardTitle={selectedBoard.title}
          onBackToHome={handleBackToHome}
        />
      )}
      <Footer />
    </>
  );
}

export default App;

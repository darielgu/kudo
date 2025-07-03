import { useState, useEffect } from "react";
import "./App.css";
import FilterButtons from "./components/FilterButtons";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import CardPage from "./components/CardPage/CardPage";
import SearchBar from "./components/SearchBar";
import { useTheme } from "./context/ThemeContext.jsx";

function App() {
  const { isDarkMode } = useTheme();
  const [selectedBoard, setSelectedBoard] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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

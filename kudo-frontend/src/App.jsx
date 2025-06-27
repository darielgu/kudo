import { useState } from "react";
import "./App.css";
import FilterButtons from "./components/FilterButtons";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <>
      <Navigation />
      <FilterButtons />
      <HomePage />
    </>
  );
}

export default App;

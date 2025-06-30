import { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";

const SearchBar = () => {
  // need to pass the value in here to HomePage.jsx and sort | also don't think we need this component
  return (
    <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        label="Search boards..."
        variant="outlined"
        sx={{
          width: "70%",
        }}
      />
    </Box>
  );
};

export default SearchBar;

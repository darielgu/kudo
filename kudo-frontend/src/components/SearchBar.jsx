import { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";

const SearchBar = ({ textChange }) => {
  return (
    <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        onInput={(e) => textChange(e.target.value)}
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

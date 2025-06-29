import { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";

const SearchBar = () => {

  return (
    <Box mt={2} sx = {{display: "flex", justifyContent: "center"}}>
        <TextField
        label="Search boards..."
        variant="outlined"
        sx = {{
            width: "70%"
        }}
        />
    </Box>
  );
};

export default SearchBar;

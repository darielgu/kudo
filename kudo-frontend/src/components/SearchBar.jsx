import { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";

const SearchBar = ({ textChange }) => {
  const [text, setText] = useState(null);
  return (
    <Box mt={0} pt={2} sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        value={text}
        onInput={(e) => setText(e.target.value)}
        label="Search boards..."
        variant="outlined"
        sx={{
          width: "60%",
        }}
      />
      <Button
        onClick={(e) => textChange(text)}
        variant="contained"
        sx={{ ml: 2, mr: 2, borderRadius: 50 }}
      >
        Search
      </Button>
      <Button
        onClick={(e) => {
          textChange("");
          setText("");
        }}
        variant="contained"
        sx={{ borderRadius: 50 }}
      >
        Clear
      </Button>
    </Box>
  );
};

export default SearchBar;

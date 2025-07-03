import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext.jsx";

const SearchBar = ({ textChange }) => {
  const [text, setText] = useState("");
  const { colors, shadows } = useTheme();

  return (
    <Box 
      mt={0} 
      pt={2} 
      sx={{ 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap"
      }}
    >
      <TextField
        value={text}
        onInput={(e) => setText(e.target.value)}
        label="Search boards..."
        variant="outlined"
        sx={{
          width: "60%",
          minWidth: 300,
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.surface,
            borderRadius: 2,
            '& fieldset': {
              borderColor: colors.border,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.textSecondary,
          },
          '& .MuiInputBase-input': {
            color: colors.text,
          },
        }}
      />
      <Button
        onClick={(e) => textChange(text)}
        variant="contained"
        sx={{ 
          borderRadius: 2,
          backgroundColor: colors.primary,
          color: 'white',
          px: 3,
          py: 1.5,
          fontWeight: 500,
          boxShadow: shadows.small,
          '&:hover': {
            backgroundColor: colors.primary,
            opacity: 0.9,
            boxShadow: shadows.medium,
          },
          transition: 'all 0.2s ease'
        }}
      >
        Search
      </Button>
      <Button
        onClick={(e) => {
          textChange("");
          setText("");
        }}
        variant="outlined"
        sx={{ 
          borderRadius: 2,
          borderColor: colors.border,
          color: colors.textSecondary,
          px: 3,
          py: 1.5,
          fontWeight: 500,
          '&:hover': {
            borderColor: colors.error,
            color: colors.error,
            backgroundColor: colors.surface,
          },
          transition: 'all 0.2s ease'
        }}
      >
        Clear
      </Button>
    </Box>
  );
};

export default SearchBar;

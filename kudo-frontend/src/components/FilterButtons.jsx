import React, { useState } from "react";
import { Button, Container, Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext.jsx";

const FilterButtons = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { colors, shadows } = useTheme();

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const filterButtons = [
    { id: "all", label: "All" },
    { id: "recent", label: "Recent" },
    { id: "celebration", label: "Celebration" },
    { id: "inspiration", label: "Inspiration" },
    { id: "thankYou", label: "Thank You" },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          my: 4,
          flexWrap: "wrap"
        }}
      >
        {filterButtons.map((button) => (
          <Button
            key={button.id}
            id={button.id}
            onClick={(e) => handleFilterClick(e.target.id)}
            variant={activeFilter === button.id ? "contained" : "outlined"}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 500,
              fontSize: '0.9rem',
              textTransform: 'none',
              minWidth: 100,
              backgroundColor: activeFilter === button.id ? colors.primary : 'transparent',
              color: activeFilter === button.id ? 'white' : colors.textSecondary,
              borderColor: activeFilter === button.id ? 'transparent' : colors.border,
              boxShadow: activeFilter === button.id ? shadows.small : 'none',
              '&:hover': {
                backgroundColor: activeFilter === button.id 
                  ? colors.primary 
                  : colors.surface,
                opacity: activeFilter === button.id ? 0.9 : 1,
                boxShadow: activeFilter === button.id ? shadows.medium : shadows.small,
              },
              transition: 'all 0.2s ease'
            }}
          >
            {button.label}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default FilterButtons;

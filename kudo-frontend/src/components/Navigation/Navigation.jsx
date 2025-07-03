import React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Tooltip,
  CssBaseline,
  Box,
  IconButton,
} from "@mui/material";
import Sticky from "@mui/icons-material/StickyNote2";
import { useTheme } from "../../context/ThemeContext.jsx";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navigation = () => {
  const { isDarkMode, toggleTheme, colors, shadows } = useTheme();

  return (
    <>
      <CssBaseline />
      <AppBar 
        position="relative" 
        sx={{ 
          background: colors.surface,
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: shadows.small
        }}
      >
        <Toolbar sx={{ 
          color: colors.text, 
          justifyContent: "space-between",
          minHeight: '64px'
        }}>
          <Box display="flex" alignItems="center">
            <Sticky sx={{ 
              fontSize: '2rem', 
              color: colors.primary,
              mr: 1
            }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                color: colors.text
              }}
            >
              KudoBoard
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
            <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: colors.textSecondary,
                  '&:hover': {
                    color: colors.primary,
                    backgroundColor: colors.background,
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;

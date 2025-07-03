import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "../context/ThemeContext.jsx";

export default function MediaCard({
  url,
  title,
  description,
  id,
  board,
  onBoardClick,
  onBoardDelete,
  date,
  owned,
}) {
  const { colors, shadows, isDarkMode } = useTheme();
  const darkCardBg = "#181d23";
  const darkCardBorder = "#232a36";
  const darkText = "#f1f5f9";
  const darkSecondary = "#94a3b8";

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        minWidth: 300, 
        mb: 3,
        backgroundColor: isDarkMode ? darkCardBg : colors.card,
        border: `1px solid ${isDarkMode ? darkCardBorder : colors.border}`,
        borderRadius: 2,
        boxShadow: shadows.small,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: shadows.medium,
        },
        transition: 'all 0.2s ease'
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={url}
        alt={title}
        sx={{ 
          cursor: "pointer",
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
        onClick={() => onBoardClick && onBoardClick(board)}
      />
      <CardContent sx={{ p: 2, backgroundColor: isDarkMode ? darkCardBg : colors.card }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? darkText : colors.text,
            mb: 1,
            lineHeight: 1.3
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: isDarkMode ? darkSecondary : colors.textSecondary,
            mb: 2,
            lineHeight: 1.5
          }}
        >
          {description}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: isDarkMode ? darkSecondary : colors.textSecondary,
            fontSize: '0.75rem',
            opacity: 0.8
          }}
        >
          {date && new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, backgroundColor: isDarkMode ? darkCardBg : colors.card }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onBoardClick && onBoardClick(board)}
          sx={{
            color: colors.primary,
            borderColor: colors.primary,
            fontWeight: 500,
            mr: 1,
            '&:hover': {
              backgroundColor: colors.primary,
              color: 'white',
              borderColor: colors.primary,
            },
            transition: 'all 0.2s ease'
          }}
        >
          View
        </Button>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => onBoardDelete && onBoardDelete(id)}
          sx={{
            fontWeight: 500,
            borderColor: colors.error,
            color: colors.error,
            '&:hover': {
              backgroundColor: colors.error,
              color: 'white',
              borderColor: colors.error,
            },
            transition: 'all 0.2s ease'
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

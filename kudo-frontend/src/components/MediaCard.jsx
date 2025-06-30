import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({
  url,
  title,
  description,
  id,
  onBoardClick,
  onBoardDelete,
}) {
  return (
    <Card sx={{ width: 305, height: 450 }}>
      <CardMedia sx={{ height: 250 }} image={url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            onBoardClick({ id: id, title: title })
          } // TODO - change this later to pass in board data
        >
          View
        </Button>
        <Button size="small" onClick={() => onBoardDelete(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

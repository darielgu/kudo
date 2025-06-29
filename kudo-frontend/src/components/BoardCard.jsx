import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BoardCard({ url, title, description, id }) {
  return (
    <Card sx={{ width: 305, height: 450 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
        <CardMedia sx={{ height: 250 }} image={url} />
      <CardActions>
        <Button size="small">Upvote </Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}

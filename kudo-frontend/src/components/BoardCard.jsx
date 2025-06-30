import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BoardCard({ url, title, description, likes, id, onUpVote, deleteCard}) {
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
        <Button 
          size="small"
          onClick = {() => onUpVote(id)}
        >Upvote </Button>
        <Button 
          size="small"
          onClick = {() => deleteCard(id)}
        >Delete</Button>
      </CardActions>
        <CardContent sx={{ pt: 0, textAlign: 'center' }}>
        <Typography variant="body2" textAlign="left" sx={{ color: "text.secondary" }}>
          {likes || 0} likes
        </Typography>
      </CardContent>
    </Card>
  );
}


// on click upvote button => call addLike function, send a put request to DB update like #, dependency useEffct, refresh

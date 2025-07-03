import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PushPinIcon from '@mui/icons-material/PushPin';

export default function BoardCard({ url, title, description, likes, id, onUpVote, deleteCard, pinned, onPin }) {
  return (
    <Card sx={{ width: 305, height: 450, border: pinned ? '2px solid #ef4444' : undefined }}>
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
          onClick={() => onUpVote(id)}
        >Upvote </Button>
        <Button 
          size="small"
          onClick={() => deleteCard(id)}
        >Delete</Button>
        <Button
          size="small"
          onClick={() => onPin(id)}
          sx={{ color: pinned ? '#ef4444' : '#64748b', fontWeight: 600 }}
        >
          <PushPinIcon sx={{ color: pinned ? '#ef4444' : '#64748b', mr: 0.5 }} />
          {pinned ? 'Unpin' : 'Pin'}
        </Button>
      </CardActions>
      <CardContent sx={{ pt: 0, textAlign: 'center' }}>
        <Typography variant="body2" textAlign="left" sx={{ color: "text.secondary" }}>
          {likes || 0} likes
        </Typography>
      </CardContent>
    </Card>
  );
}


import { Modal, Box, Typography, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";
import axios from 'axios';

const CardModal = ({ boardId, onCardCreated }) => {
  const [open, setOpen] = useState(false);
  const [gif, setGif] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");
  
  const [formCardData, setFormCardData] = useState({
    message: "",
    image_url: "", 
    author: ""
  });

  // handle input changes from form fields, on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormCardData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => setOpen(false);

  const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: 650,
    borderRadius: 1,
  };

  const handleGifSearch = async () => {
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${gif}&limit=6`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGifResults(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  // POST to add cards to the DB
  const addToCards = async () => {
    try {
      console.log(formCardData);
      if (!formCardData.message.trim()){
        alert("Please enter a card message");
        return
      }

      // prepare data for API
      const cardData = {
        message: formCardData.message,
        image_url: formCardData.image_url || "",
        board_id: boardId, // passed as prop from cardpage
        author: formCardData.author || ""
      };

      const response = await axios.post('http://localhost:3000/card', cardData);
      console.log("Card created successfully:", response.data);

      // Reset form data
      setFormCardData({
        message: "",
        image_url: "",
        author: ""
      });

      handleClose();

      // Notify parent component to refresh cards list
      if (onCardCreated) {
        onCardCreated();
      }

    } catch (error) {
        console.error("Error creating card:", error.response?.data || error.message);
        alert("Failed to create card. Please try again.");
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="contained"
      >
        Create
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="form-container">
            <Typography
              variant="h5"
              component="h5"
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              {" "}
              Create a New Card{" "}
            </Typography>
            <TextField
              sx={{ width: "100%", mb: 3, mt: 4 }}
              name="message"
              label="Enter Card Message"
              variant="outlined"
              value = {formCardData.message}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ width: "100%" }}
              id="gif"
              label="Search GIFs.."
              variant="outlined"
              onChange={(e) => {
                setGif(e.target.value);
              }}
            />
            <Button
              onClick={handleGifSearch}
            >
              Search gif
            </Button>
            {gifResults.length > 0 && (
              <Box
                sx={{
                  width: "100%",
                  maxHeight: 320,
                  overflowY: "auto",
                  mt: 2,
                  mb: 2,
                  px: 0,
                }}
              >
                <Grid container spacing={2}>
                  {gifResults.map((gifObj) => (
                    <Grid item xs={4} key={gifObj.id} sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={gifObj.images.fixed_height.url}
                        alt={gifObj.title}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          border: selectedGif === gifObj.images.fixed_height.url ? "3px solid #1976d2" : "2px solid #ccc",
                          borderRadius: 8,
                          cursor: "pointer",
                          display: "block",
                        }}
onClick={() => {
  const gifUrl = gifObj.images.fixed_height.url; // Use direct GIF URL, not embed
  setSelectedGif(gifUrl);
  setFormCardData(prev => ({
    ...prev,
    image_url: gifUrl
  }));
}}                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            <TextField
              sx={{ width: "100%", mt: 2 }}
              id="gif-url"
              label="Enter GIF URL"
              variant="outlined"
              value={selectedGif}
              onChange={(e) => {
                setSelectedGif(e.target.value)
                setFormCardData(prev => ({  // update the form data from user input
                  ...prev,
                  image_url: e.target.value
                }));
              }}
            />
            <Button> Copy GIF URL</Button>
            <TextField
              sx={{ width: "100%", mt: 2 }}
              name="author"
              label="Enter Owner (optional)"
              variant="outlined"
              value = {formCardData.author}
              onChange={handleInputChange}
            />

            {/* Button at bottom - center of modal */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="contained" onClick = {addToCards}> Create Card </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardModal;

import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./HomeModal.css";
import axios from "axios";

const BoardModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    description: "",
    image_url: "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: 800,
  };

  const handleInputChange = (e) => {
    // handle input change for any form value, grabbing name and value from the event target
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addToBoards = async () => {
    try {
      // Make sure required fields are filled
      if (!formData.title || !formData.category) {
        alert("Please fill in the title and category fields");
        return;
      }

      // POST request to create new board
      const response = await axios.post(
        "http://localhost:3000/board",
        formData
      );
      console.log("Board created successfully:", response.data);

      // Reset form data
      setFormData({
        title: "",
        category: "",
        author: "",
        description: "",
        image_url: "",
      });

      // Close modal
      handleClose();

      // refresh the boards list
      window.location.reload(); // reload the page to show the new board | not needed
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="form-container">
            <TextField
              sx={{ width: "100%", my: 5 }}
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={handleInputChange} // handle input change for title
              required
            />

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange} // handle input change for category
              style={{
                height: 56,
                width: "100%",
                borderRadius: 4,
                border: "1px solid #ccc",
                padding: "0 14px",
                marginBottom: "20px",
                fontSize: "16px",
              }}
              required
            >
              <option value="">Select a category</option>
              <option value="celebration">Celebration</option>
              <option value="inspiration">Inspiration</option>
              <option value="thankYou">Thank You</option>
            </select>

            <TextField
              sx={{ width: "100%", mb: 2 }}
              id="author"
              name="author"
              label="Author"
              variant="outlined"
              value={formData.author}
              onChange={handleInputChange} // handle input change for author
            />

            <TextField
              sx={{ width: "100%", mb: 2 }}
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange} // handle input change for description
            />

            <TextField
              sx={{ width: "100%", mb: 2 }}
              id="image_url"
              name="image_url"
              label="Image URL"
              variant="outlined"
              value={formData.image_url}
              onChange={handleInputChange} // handle input change for image url
            />

            <Button
              sx={{ my: 5 }}
              variant="outlined"
              onClick={addToBoards}
              disabled={!formData.title || !formData.category} // disable button if title or category is not filled
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BoardModal;

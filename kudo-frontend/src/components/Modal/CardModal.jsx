import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

const CardModal = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: 1000,
  };
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="contained"
      >
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="form-container">
            <TextField
              sx={{ width: "100%", my: 5 }}
              id="title"
              label="Title"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%", mb: 3 }}
              id="description"
              label="Description"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%" }}
              id="gif"
              label="Gif Search"
              variant="outlined"
            />
            <Button>Search gif</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardModal;

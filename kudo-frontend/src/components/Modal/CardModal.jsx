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
    height: 700,
    borderRadius: 1,
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
            <Typography variant = 'h5' component='h5' align = 'center' sx={{fontWeight: "bold"}}> Create a New Card </Typography>
            <TextField
              sx={{ width: "100%", my: 5 }}
              id="title"
              label="Enter Card Title"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%", mb: 3 }}
              id="description"
              label="Enter card description"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%" }}
              id="gif"
              label="Search GIFs.."
              variant="outlined"
            />
            <Button>Search gif</Button>
            <TextField
              sx={{ width: "100%", mt: 2}}
              id="gif-url"
              label="Enter GIF URL"
              variant="outlined"
            />
            <Button> Copy GIF URL</Button>
            <TextField
              sx={{ width: "100%", mt: 2}}
              id="enter-owner"
              label="Enter Owner (optional)"
              variant="outlined"
            />

            {/* Button at bottom - center of modal */}
            <Box sx = {{display : 'flex', justifyContent: 'center', mt: 3}}>
              <Button variant ='contained'> Create Card </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardModal;

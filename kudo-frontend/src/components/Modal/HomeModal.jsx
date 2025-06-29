import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./BoardModal.css";
import axios from "axios";

const BoardModal = ({ open, handleClose, information }) => {
  const [info, setInfo] = useState({});
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
  function addToBoards() {
    // function to post request a new board on modal submit
    // axios post request to create new board with information
    handleClose();
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="form-container">
            <TextField
              sx={{ width: "100%", my: 5 }}
              id="title"
              label="Title"
              variant="outlined"
            />

            <select id="category" name="category" sx={{ height: 200 }}>
              <option value="Recents">Apple</option>
              <option value="banana">Banana</option>
              <option value="cherry">Cherry</option>
            </select>
            {/* </TextField> */}
            <TextField
              sx={{ width: "100%" }}
              id="author"
              label="Author"
              variant="outlined"
            />
            <Button onClick={() => {}}>Submit</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BoardModal;

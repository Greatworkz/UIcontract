import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  maxWidth: 600,
  width: "90%",
};

const ModalSection = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />
        {children}
      </Box>
    </Modal>
  );
};

export default ModalSection;

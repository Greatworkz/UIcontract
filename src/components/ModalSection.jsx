import React from "react";
import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseSvg from "../assets/icons/Close.svg";
const modalStyle = {
  position: "absolute",
  top: "0%",                  // start near top of screen
  left: "50%",                // center horizontally
  transform: "translateX(-50%)", // only center horizontally
  bgcolor: "#fff",
  minWidth: {
    xs: "90%",   // mobile full width
    sm: "90%",
    md: "510px", // desktop fixed width
  },
  maxHeight: "90vh",
  overflowY: "auto",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
};


const ModalSection = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          sx={{
            backgroundColor: "#F1F4FF",
            borderBottom: "1px solid #DCDCEF",
            opacity: 1,
            px: 2,
            py: 1,
            marginBottom: 0,
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 600, color: "#061445" }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <img src={CloseSvg} alt="view" style={{ width: 16, height: 16 }} />
          </IconButton>
        </Box>

          <Box sx={{ maxHeight: "calc(90vh - 60px)", overflowY: "auto" }}>
            {children}
          </Box>
      </Box>
    </Modal>
  );
};

export default ModalSection;

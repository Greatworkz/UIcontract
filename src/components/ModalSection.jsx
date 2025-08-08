import React from "react";
import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseSvg from "../assets/icons/Close.svg";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  minWidth: {
    xs: "90%",  // for small devices
    sm: "510px", // from sm and above
  },
  // width: "90%",
  // maxWidth: "900px",
  // minWidth: '510px',
  maxHeight: "90vh",
  overflowY: "auto",
  // borderRadius: "8px",
  // boxShadow: 24,
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

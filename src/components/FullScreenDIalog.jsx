import React from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FullScreenDialog = ({ open, onClose, title, children }) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      {/* Top blue header */}
      <AppBar sx={{ position: "relative", bgcolor: "#061445" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "20px",
              color: "#fff",
              lineHeight: "30px",
              letterSpacing: 0.2,
            }}
          >
            {title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content area */}
      <Box sx={{ p: 3, bgcolor:"#f5f5f5", height: "100%" }}>
        {children}
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;

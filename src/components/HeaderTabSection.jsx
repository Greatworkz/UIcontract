import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";

const HeaderTabSection = ({ title,tab, handleTabChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Title Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: "58px",
          position: "relative",
          opacity: 1,
          px: 2,
          py: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "30px",
            letterSpacing: "0.2px",
            color: "#061445",
          }}
        >
        {title}
        </Typography>
      </Box>

      {/* Tabs Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: "100%",
          position: "relative",
          px: 2,
          border: "1px solid #F3F3F3",
          boxShadow: "0px 2px 2px 0px #D3D6E14D",
          display: "flex",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            mt: 1,
            pb: 0,
            "& .MuiTab-root": {
              fontSize: "13px",
              fontWeight: 400,
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              color: "#061445",
              minWidth: "auto",
              px: 2,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "30px",
                height: "3px",
                backgroundColor: "transparent",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              },
            },
            "& .Mui-selected::after": {
              backgroundColor: "#2268E9",
            },
            "& .Mui-selected": {
              fontWeight: 600,
            },
          }}
        >
          <Tab label="All" value="All" />
          <Tab label="Active" value="Active" />
          <Tab label="Completed" value="Completed" />
          <Tab label="Terminated" value="Terminated" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default HeaderTabSection;

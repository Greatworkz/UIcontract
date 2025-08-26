import React from "react";
import { Box, Typography, Tabs, Tab, Button } from "@mui/material";

const HeaderTabSection = ({ title, tab, handleTabChange, onAddNew, btnTitle }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Title + Button Row */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: "58px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Title left, Button right
          px: 2,
          py: 2,
          borderBottom: "1px solid #F3F3F3",
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

        {/* Right Side Button */}
        {btnTitle && (
          <Button
            variant="contained"
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "13px",
              lineHeight: "20px",
              letterSpacing: "0px",
              textTransform: "none",
              verticalAlign: "middle",
              borderRadius: "6px",
              px: 2.5,
              py: 0.8,
              backgroundColor: "#2268E9",
            }}
            onClick={onAddNew}
          >
            {btnTitle}
          </Button>
        )}
      </Box>

      {/* Tabs Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: "100%",
          px: 2,
          border: "1px solid #F3F3F3",
          borderTop: "none",
          boxShadow: "0px 2px 2px 0px #D3D6E14D",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
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

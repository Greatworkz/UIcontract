// components/ThemedTabs.jsx
import React from "react";
import { Tabs, Tab } from "@mui/material";

const ThemedTabs = ({ value, onChange, children, ...props }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="primary"
      indicatorColor="primary"
      sx={{
        mt: 1,
        color: '#21263C',
        fontWeight: 400,
        height: '52px',
        '& .MuiTab-root': {
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
          px: 2,
          
        },
        '& .MuiTabs-indicator': {
          height: '3px',
          borderRadius: '2px',
        },
      }}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export const ThemedTab = Tab;
export default ThemedTabs;

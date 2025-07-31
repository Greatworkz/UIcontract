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
        borderBottom: '1px solid #DCDCEF',
        '& .MuiTab-root': {
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
          px: 2,
          '&.Mui-selected': {
            fontWeight: 600, // selected tab gets bolder font
          },
        },
        '& .MuiTabs-indicator': {
          height: '3px',
          // borderRadius: '2px',
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '30px',
          width: '10px'
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

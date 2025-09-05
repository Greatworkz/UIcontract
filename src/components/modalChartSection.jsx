import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const COLORS = ["#F04438", "#FEC84B", "#6C757D"];

const ModalChartSection = ({ title, data = [], sx = {} }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        border: "1px solid #0A18290D",
        display: "flex",
        flexDirection: "column",
        // p: 2,
        ...sx,
      }}
    >
      <Box
          sx={{
            py: { xs: 1.5, sm: 1.5, md: 2 },
            px: 2,
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            backgroundColor: "#FAFAFD",
            color: "#061445",
            // borderBottom: "1px solid #0A18290D",
            // padding: '10px'
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      {/* Chart Section */}
      <Box
        sx={{
          width: "100%",
          height: 250,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        
        <ResponsiveContainer width="100%" height={isSmall ? 260 : 300}>
  <PieChart>
    <Pie
      data={data}
      dataKey="value"
      nameKey="label"
      innerRadius="55%"
      outerRadius="80%"   // bigger pie
      paddingAngle={1}
    >
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.color || COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>
    <Tooltip />
    <Legend
      layout="horizontal"
      align="left"
      verticalAlign="bottom"
      formatter={(value, entry) => (
        <>
          {value}&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#000" }}>{entry.payload.value}%</span>
        </>
      )}
    />
  </PieChart>
</ResponsiveContainer>

      </Box>
    </Box>
  );
};

export default ModalChartSection;

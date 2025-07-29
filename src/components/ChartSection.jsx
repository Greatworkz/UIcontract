import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
const COLORS = ["#F04438", "#FEC84B", "#6C757D"];

// const ChartSection = ({ title, data = [] }) => {
//   return (
//     <Card
//       sx={{
//         backgroundColor: '#ffffff',
//         borderRadius: '10px',
//         fontFamily: 'Inter, sans-serif',
//         fontSize: '14px',
//         border: '1px solid #0A18290D',
//         height: '100%',
//         display: 'flex',
//         // flexDirection: 'column',
//       }}
//     >
//       <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 2 }}>
//           {title}
//         </Typography>

//         <Box sx={{ width: '100%', height: '250px' }}>
//   <ResponsiveContainer width="100%" height="100%">
//     <PieChart>
//       <Pie
//         data={data}
//         dataKey="value"
//         nameKey="label"
//         innerRadius="60%"
//         outerRadius="80%"
//         paddingAngle={3}
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend layout="vertical" align="right" verticalAlign="middle" />
//     </PieChart>
//   </ResponsiveContainer>
// </Box>

//       </CardContent>
//     </Card>
//   );
// };

const ChartSection = ({ title, data = [], sx = {} }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        border: "1px solid #0A18290D",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          sx={{
            py: { xs: 1.5, sm: 2, md: 1 },
            px: 2,
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            backgroundColor: "#FAFAFD",
            color: "#061445",
            fontSize: "14px",
            fontWeight: 600,
            mb: 0,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <ResponsiveContainer width="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={3}
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
                layout={isSmall ? "horizontal" : "vertical"}
                align="right"
                verticalAlign={isSmall ? "bottom" : "middle"}
                formatter={(value, entry) => (
                  <>
                    {value}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: "#000" }}>
                      {entry.payload.value}%
                    </span>
                  </>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartSection;

// import React from "react";
// import { Card, CardContent, Typography, Box, Button } from "@mui/material";
// import DownArrow from "../assets/icons/downArrow2.svg";


// const CardSection = ({
//   title,
//   children,
//   showArrow = false,
//   headerActionLabel = "",
//   onHeaderActionClick = null,
// }) => {
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         border: "1px solid #EBECEF",
//         borderRadius: "8px",
//         backgroundColor: "#ffffff",
//       }}
//     >
//       {title && (
//         <Box sx={{ p: '4px' }}>
//           <Box
//           sx={{
//             py: { xs: 1.5, sm: 1.5, md: 2 },
//             px: 2,
//             borderTopLeftRadius: "6px",
//             borderTopRightRadius: "6px",
//             backgroundColor: "#FAFAFD",
//             color: "#061445",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {/* Left side: Title and arrow */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             {showArrow && (
//               <Box
//                 component="img"
//                 src={DownArrow}
//                 alt="Arrow"
//                 sx={{ width: 11, height: 6 }}
//               />
//             )}
//             <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
//               {title}
//             </Typography>
//           </Box>

//           {/* Right side: Optional action button */}
//           {headerActionLabel && onHeaderActionClick && (
//             <Button
//               variant="text"
//               size="small"
//               sx={{
//                 fontFamily: "Inter, sans-serif",
//                 fontWeight: 500,
//                 fontStyle: "normal",
//                 fontSize: "13px",
//                 lineHeight: "1",
//                 letterSpacing: "0.2px",
//                 backgroundColor: '#fff'
//               }}
//               onClick={onHeaderActionClick}
//             >
//               {headerActionLabel}
//             </Button>
//           )}
//         </Box>
//         </Box>
//       )}

//       <CardContent sx={{ p: 3,minHeight: '120px' }}>
//         <Box sx={{ fontSize: "14px" }}>{children}</Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CardSection;

import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Button, Collapse } from "@mui/material";
import DownArrow from "../assets/icons/downArrow2.svg";

const CardSection = ({
  title,
  children,
  showArrow = false,
  defaultExpanded = true, // 🔹 new prop (default open)
  headerActionLabel = "",
  onHeaderActionClick = null,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (showArrow) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #EBECEF",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      {title && (
        <Box sx={{ p: "4px" }}>
          <Box
            sx={{
              py: { xs: 1.5, sm: 1.5, md: 2 },
              px: 2,
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              backgroundColor: "#FAFAFD",
              color: "#061445",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: showArrow ? "pointer" : "default",
            }}
            onClick={handleToggle}
          >
            {/* Left side: Title and arrow */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {showArrow && (
                <Box
                  component="img"
                  src={DownArrow}
                  alt="Arrow"
                  sx={{
                    width: 11,
                    height: 6,
                    transition: "transform 0.3s",
                    transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                  }}
                />
              )}
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {title}
              </Typography>
            </Box>

            {/* Right side: Optional action button */}
            {headerActionLabel && onHeaderActionClick && (
              <Button
                variant="text"
                size="small"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "13px",
                  lineHeight: "1",
                  letterSpacing: "0.2px",
                  backgroundColor: "#fff",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // prevent arrow toggle
                  onHeaderActionClick();
                }}
              >
                {headerActionLabel}
              </Button>
            )}
          </Box>
        </Box>
      )}

      {/* Expand/Collapse Content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 3, minHeight: "120px" }}>
          <Box sx={{ fontSize: "14px" }}>{children}</Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardSection;

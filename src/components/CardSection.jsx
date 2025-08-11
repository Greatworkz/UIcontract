import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import DownArrow from "../assets/icons/downArrow2.svg";

/**
 * CardSection Component
 *
 * Props:
 * - title (string): Title to display on the card header.
 * - children (node): Content inside the card body.
 * - showArrow (boolean): Whether to show the arrow icon on the left.
 * - headerActionLabel (string): Optional button text (e.g., "+ Add").
 * - onHeaderActionClick (function): Function to call when button is clicked.
 */
const CardSection = ({
  title,
  children,
  showArrow = false,
  headerActionLabel = "",
  onHeaderActionClick = null,
}) => {
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
        <Box sx={{ p:1}}>
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
          }}
        >
          {/* Left side: Title and arrow */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {showArrow && (
              <Box
                component="img"
                src={DownArrow}
                alt="Arrow"
                sx={{ width: 11, height: 6 }}
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
                backgroundColor: '#fff'
              }}
              onClick={onHeaderActionClick}
            >
              {headerActionLabel}
            </Button>
          )}
        </Box>
        </Box>
      )}

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ fontSize: "14px" }}>{children}</Box>
      </CardContent>
    </Card>
  );
};

export default CardSection;

// import React from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import DownArrow from "../assets/icons/downArrow2.svg";
// const CardSection = ({ title, children, showArrow = false }) => {
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         border: "1px solid #0A18290D",
//         borderRadius: "8px",
//         backgroundColor: "#ffffff",
//       }}
//     >
//       {title && (
//         <Box
//           sx={{
//             py: { xs: 1.5, sm: 1.5, md: 2 },
//             px: 2,
//             borderTopLeftRadius: "6px",
//             borderTopRightRadius: "6px",
//             backgroundColor: "#FAFAFD",
//             color: "#061445",
//             display: "flex",
//             // justifyContent: "space-between",
//             alignItems: "center",
//             gap: 1
//           }}
//         >
//           {showArrow && (
//             <Box
//               component="img"
//               src={DownArrow}
//               alt="Arrow"
//               sx={{ width: 11, height: 6 }}
//             />
//           )}

//           <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Box>
//       )}
//       <CardContent sx={{ p: 3 }}>
//         <Box sx={{ fontSize: "14px" }}>{children}</Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CardSection;

// const CardSection = ({ title, children }) => {
//   return (
//     <Card
//     elevation={0}
//       sx={{
//         backgroundColor: '#ffffff',
//         borderRadius: '8px',
//         fontFamily: 'Inter, sans-serif',
//         fontSize: '13px',
//         fontWeight: 500,
//         border: '1px solid #0A18290D'
//       }}
//     >
//       <CardContent sx={{ p: 3 }}>
//         {title && (
//           <Typography
//             component="h2"
//             sx={{
//               fontSize: '18px',
//               fontWeight: 600,
//               mb: 2,
//               color: '#212529',
//               fontFamily: 'Inter, sans-serif',

//             }}
//           >
//             {title}
//           </Typography>
//         )}
//         <Box sx={{ fontSize: '14px' }}>
//           {children}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CardSection;

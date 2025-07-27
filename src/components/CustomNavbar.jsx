import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
const tabRoutes = [
  { label: "Home", path: "/home" },
  {
    label: "Contracts",
    path: "/contracts",
    include: ["contracts", "/contract/add"],
  },
  {
    label: "Obligations",
    path: "/obligations",
    include: ["/obligations", "/obligationView"],
  },
  { label: "Suppliers", path: "/suppliers" },
  { label: "Financial", path: "/financial" },
  { label: "Compliance", path: "/compliance" },
  { label: "Analytics", path: "/analytics" },
];

const CustomNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // Match current route to tab index
  const currentTabIndex = tabRoutes.findIndex((route) =>
    location.pathname.startsWith(route.path)
  );
  // const currentTabIndex = tabRoutes.findIndex(route =>
  //   route.include?.some(p => location.pathname.startsWith(p))
  // );

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleTabChange = (event, newValue) => {
    const selectedRoute = tabRoutes[newValue]?.path;
    if (selectedRoute) navigate(selectedRoute);
  };

  return (
    <>
      {/* Top Navbar */}
      <AppBar
        position="static"
        sx={{  backgroundColor: "#061445", height: "60px" }} // px: 2, py: 2
      >
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img
              src="/your-logo.png"
              alt="Logo"
              width="24"
              style={{ marginRight: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              {/* Contract */}
              Contract
            </Typography>
          </Box>

          {/* Company Dropdown */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#ccc" }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // light transparent white
                  borderRadius: "6px",
                  height: "36px",
                  width: "222px",
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  // '&:hover .MuiOutlinedInput-notchedOutline': {
                  //   borderColor: '#fff',
                  // },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                },
              }}
              inputProps={{
                style: {
                  color: "#fff",
                },
              }}
            /> */}

            <Typography
              onClick={handleMenuOpen}
              sx={{
                cursor: "pointer",
                color: "#fff",
                mr: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              Energica Pvt.Lim... <ExpandMoreIcon fontSize="small" />
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            </Menu>

            <IconButton sx={{ color: "#fff" }}>
              <NotificationsNoneIcon />
            </IconButton>

            <Avatar
              alt="User"
              src="https://via.placeholder.com/32"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation Tabs */}
      <AppBar
        position="static"
        sx={{
          px: 2,
          py: 1,
          backgroundColor: "#091C5E",
          color: "#fff",
          boxShadow: "none",
          paddingBottom: '0px',
              paddingTop: '0px'
          // height: '60px'
        }}
      >
        <Tabs
          value={currentTabIndex === -1 ? false : currentTabIndex}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          textColor="inherit"
          aria-label="page navigation tabs"
          TabIndicatorProps={{ style: { display: "none" } }} // hide the default indicator
          sx={{
            "& .MuiTab-root": {
              fontWeight: 500,
              textTransform: "none",
              fontSize: "14px",
              
              // minHeight: "0px",
              // px: 2,
              // borderRadius: "6px", // optional for rounded look
            },
            "& .Mui-selected": {
              backgroundColor: "#1570EF",
              color: "#fff",

            },
          }}
        >
          {tabRoutes.map((tab, index) => (
            <Tab key={index} label={tab.label} disableRipple />
          ))}
        </Tabs>
      </AppBar>
    </>
  );
};

export default CustomNavbar;

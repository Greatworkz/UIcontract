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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useLocation, useNavigate } from "react-router-dom";
import LogoSvg from "../assets/icons/logo.svg";
const tabRoutes = [
  { label: "Home", path: "/home" },
  { label: "Contracts", path: "/contracts", include: ["/contract/add"] },
  { label: "Obligations", path: "/obligations", include: ["/obligationView"] },
  {
    label: "Audits",
    path: "/audits",
    submenu: [
      { label: "Audit Plan", path: "/auditplan" },
      { label: "Audit Observation", path: "/auditobservation" },
    ],
  },
  { label: "Suppliers", path: "/suppliers" },
  { label: "Financial", path: "/financial" },
  { label: "Compliance", path: "/compliance" },
  { label: "Analytics", path: "/analytics" },
  { label: "Audit Observation UI", path: "/issue" },
];

const CustomNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [auditsAnchorEl, setAuditsAnchorEl] = React.useState(null);
  const [auditsTabIndex, setAuditsTabIndex] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

// In CustomNavbar component:
const currentTabIndex = tabRoutes.findIndex((route) => {
  // Match direct path
  if (location.pathname.startsWith(route.path)) return true;

  // Match included extra paths
  if (route.include?.some((p) => location.pathname.startsWith(p))) return true;

  // Match submenu items
  if (route.submenu?.some((item) => location.pathname.startsWith(item.path)))
    return true;

  return false;
});

  const handleAuditsMenuOpen = (event, index) => {
    setAuditsAnchorEl(event.currentTarget);
    setAuditsTabIndex(index);
  };

  const handleAuditsMenuClose = () => {
    setAuditsAnchorEl(null);
    setAuditsTabIndex(null);
  };

  const handleSubmenuItemClick = (path) => {
    navigate(path);
    handleAuditsMenuClose();
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleTabChange = (event, newValue) => {
    const selectedRoute = tabRoutes[newValue]?.path;
    if (selectedRoute) {
      if (selectedRoute === "/audits") {
        // Don't navigate if it's the Audits tab (we'll handle via submenu)
        return;
      }
      navigate(selectedRoute);
    }
  };
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      {/* Top Bar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#061445", height: "60px" }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img
              src={LogoSvg}
              alt="Logo"
              width="119"
              style={{ marginRight: 8 }}
            />
            {/* <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Contract
            </Typography> */}
          </Box>

          {/* Search, Company, Notifications */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                // variant="outlined"
                size="small"
                placeholder="Search..."
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#98999B" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    height: "30px",
                    width: "222px",
                    color: "#fff",
                    border: "none",
                    padding: 1,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& input::placeholder": {
                      color: "#98999B",
                      opacity: 1,
                    },
                  },
                }}
                inputProps={{ style: { color: "#fff" } }}
              />

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
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
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
          )}

          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{ width: 240 }}
                  role="presentation"
                  onClick={handleDrawerToggle}
                >
                  <List>
                    {tabRoutes.map((tab, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(tab.path)}>
                          <ListItemText primary={tab.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <List>
                    <ListItemButton>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Settings" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate("/")}>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Bottom Tabs only for desktop/tablet */}
      {!isMobile && (
        <AppBar
          position="static"
          sx={{
            px: 2,
            py: 1,
            backgroundColor: "#091C5E",
            color: "#fff",
            boxShadow: "none",
            paddingBottom: "0px",
            paddingTop: "0px",
          }}
        >
          <Tabs
            value={currentTabIndex === -1 ? false : currentTabIndex}
            onChange={handleTabChange}
            variant="standard"
            aria-label="page navigation tabs"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              color: "#FFFFFF",
              "& .MuiTab-root": {
                fontWeight: 500,
                textTransform: "none",
                fontSize: "14px",
                color: "#FFFFFF",
              },
              "& .Mui-selected": {
                backgroundColor: "#1570EF  !important",
                color: "#FFFFFF !important",
              },
            }}
          >
            {tabRoutes.map((tab, index) => (
              <Tab
                key={index}
                label={
                  tab.submenu ? (
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAuditsMenuOpen(e, index);
                      }}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {tab.label}
                      <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                  ) : (
                    tab.label
                  )
                }
                disableRipple
              />
            ))}
          </Tabs>

          <Menu
            anchorEl={auditsAnchorEl}
            open={Boolean(auditsAnchorEl)}
            onClose={handleAuditsMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {auditsTabIndex !== null &&
              tabRoutes[auditsTabIndex].submenu.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => handleSubmenuItemClick(item.path)}
                  selected={location.pathname.startsWith(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </Menu>
        </AppBar>
      )}
    </>
  );
};

export default CustomNavbar;

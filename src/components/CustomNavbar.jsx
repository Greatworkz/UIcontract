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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation, useNavigate } from "react-router-dom";
import LogoSvg from "../assets/icons/logo.svg";

const tabRoutes = [
  { label: "Home", path: "/home" },
  { 
    label: "Contracts", 
    path: "/contracts", 
    include: ["/contract/add"],
    submenu: [
      { 
        label: "CCN", 
        path: "/contracts",
        submenu: [
          { label: "CCN Plan", path: "/contracts/ccn/plan" },
          { label: "CCN Observation", path: "/contracts/ccn/observation" },
        ]
      },
    ]
  },
  { label: "Obligations", path: "/obligations", include: ["/obligationView"] },
  { label: "MSA", path: "/msa/list", include: ["/msa/add"] },
  { label: "CR", path: "/cr/list", include: ["/cr/add"] },
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
];

const CustomNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState(null);
  const [currentSubmenuIndex, setCurrentSubmenuIndex] = React.useState(null);
  const [nestedSubmenuAnchorEl, setNestedSubmenuAnchorEl] = React.useState(null);
  const [currentNestedSubmenu, setCurrentNestedSubmenu] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const currentTabIndex = tabRoutes.findIndex((route) => {
    // Match direct path
    if (location.pathname.startsWith(route.path)) return true;

    // Match included extra paths
    if (route.include?.some((p) => location.pathname.startsWith(p))) return true;

    // Match submenu items
    if (route.submenu?.some((item) => {
      if (location.pathname.startsWith(item.path)) return true;
      // Check nested submenu items
      if (item.submenu?.some((nestedItem) => location.pathname.startsWith(nestedItem.path))) return true;
      return false;
    })) return true;

    return false;
  });

  const handleSubmenuOpen = (event, index) => {
    setSubmenuAnchorEl(event.currentTarget);
    setCurrentSubmenuIndex(index);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
    setCurrentSubmenuIndex(null);
    setNestedSubmenuAnchorEl(null);
    setCurrentNestedSubmenu(null);
  };

  const handleNestedSubmenuOpen = (event, submenuItem) => {
    event.stopPropagation();
    setNestedSubmenuAnchorEl(event.currentTarget);
    setCurrentNestedSubmenu(submenuItem);
  };

  const handleNestedSubmenuClose = () => {
    setNestedSubmenuAnchorEl(null);
    setCurrentNestedSubmenu(null);
  };

  const handleSubmenuItemClick = (path) => {
    navigate(path);
    handleSubmenuClose();
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  
  const handleTabChange = (event, newValue) => {
    const selectedRoute = tabRoutes[newValue];
    if (selectedRoute && !selectedRoute.submenu) {
      navigate(selectedRoute.path);
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
          </Box>

          {/* Search, Company, Notifications */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
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
                        handleSubmenuOpen(e, index);
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

          {/* First level submenu */}
          <Menu
            anchorEl={submenuAnchorEl}
            open={Boolean(submenuAnchorEl)}
            onClose={handleSubmenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {currentSubmenuIndex !== null &&
              tabRoutes[currentSubmenuIndex].submenu?.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={(e) => {
                    if (item.submenu) {
                      handleNestedSubmenuOpen(e, item);
                    } else {
                      handleSubmenuItemClick(item.path);
                    }
                  }}
                  selected={location.pathname.startsWith(item.path)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.label}
                  {item.submenu && <ChevronRightIcon fontSize="small" />}
                </MenuItem>
              ))}
          </Menu>

          {/* Nested submenu */}
          <Menu
            anchorEl={nestedSubmenuAnchorEl}
            open={Boolean(nestedSubmenuAnchorEl)}
            onClose={handleNestedSubmenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {currentNestedSubmenu?.submenu?.map((nestedItem, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  navigate(nestedItem.path);
                  handleSubmenuClose();
                }}
                selected={location.pathname.startsWith(nestedItem.path)}
              >
                {nestedItem.label}
              </MenuItem>
            ))}
          </Menu>
        </AppBar>
      )}
    </>
  );
};

export default CustomNavbar;
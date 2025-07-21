import React from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';

const tabRoutes = [
  { label: 'Home', path: '/home' },
  { label: 'Contracts', path: '/contracts', include: ['contracts','/contract/add']  },
  { label: 'Obligations', path: '/obligations', include: ['/obligations', '/obligationView'] },
  { label: 'Suppliers', path: '/suppliers' },
  { label: 'Financial', path: '/financial' },
  { label: 'Compliance', path: '/compliance' },
  { label: 'Analytics', path: '/analytics' },
];

const CustomNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // Match current route to tab index
   const currentTabIndex = tabRoutes.findIndex(route => location.pathname.startsWith(route.path));
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
      <AppBar position="static" sx={{ px: 2, backgroundColor: '#061445' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img src="/your-logo.png" alt="Logo" width="24" style={{ marginRight: 8 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
              {/* Contract */}
              test
            </Typography>
          </Box>

          {/* Company Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              onClick={handleMenuOpen}
              sx={{
                cursor: 'pointer',
                color: '#fff',
                mr: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Energica Pvt.Lim... <ExpandMoreIcon fontSize="small" />
            </Typography>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            </Menu>

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
          backgroundColor: '#061445',
          color: '#fff',
          boxShadow: 'none',
        }}
      >
        <Tabs
          value={currentTabIndex === -1 ? false : currentTabIndex}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
          textColor="inherit"
          aria-label="page navigation tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#1570EF',
              height: '3px',
              borderRadius: '3px',
            },
          }}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '15px',
              minHeight: '48px',
              px: 2,
            },
            '& .Mui-selected': {
              color: '#fff',
            },
          }}
        >
          {tabRoutes.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
    </>
  );
};

export default CustomNavbar;

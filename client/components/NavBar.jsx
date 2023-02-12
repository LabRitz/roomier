import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import NightlightIcon from '@mui/icons-material/Nightlight';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import Context from './context/Context.js';
import ColorModeContext from "./context/ColorModeContext.js";
import Phrases from "./Phrases.jsx";
import "../stylesheets/navbar.scss";

const pages = [
  { title: 'Home', nav: '/' },
  { title: 'Create Post', nav: '/createPost' },
];
const settings = [
  { title: 'Profile', nav: '/profile' }, 
  { title: 'Signout', nav: '/' }
];

const NavBar = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(Context);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page.nav) navigate(page.nav)
  };
  
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (!setting.nav) return 
    else {
      (setting.nav == '/') ? handleSignout() : navigate(setting.nav)
    }
  };
  
  const handleSignout = async () => {
    try {
      const res = await fetch("/signout");
      if (res.status == 204) {
        setUserInfo("");
        navigate('/')
      }
    } catch (err) {
      console.log('ERROR: Cannot sign user out')
    }
  };

  return (
    <>
      <AppBar position="fixed" style={{background: '#98C1D9'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar 
              data-testid='menuHomeBtn'
              onClick={() => navigate('/')} 
              alt={userInfo.firstName} 
              sx={{ width: 112, 
                bgcolor: 'transparent', 
                display: { xs: 'none', sm: 'none', md: 'flex' }, 
                mr: 1 }} 
              variant='rounded'
            >
              <img className='navBarLogo' src='roomier.svg' />
            </Avatar>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#293241"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', sm: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ mr: 2, flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none' } }} >
              <Avatar data-testid='homeBtn' onClick={() => navigate('/')} alt={userInfo.firstName} sx={{ width: 112, bgcolor: 'transparent' }} variant='rounded'>
                <img className='navBarLogo' src='roomier.svg' />
              </Avatar>
            </Box>
            <Box sx={{ ml: 1, flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              <Phrases />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userInfo.firstName} sx={{ color: '#EAEAEA', bgcolor: '#3D5A80' }} src="/"/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem >
                  <Box onClick={() => {colorMode.toggleColorMode(); setAnchorElNav(null)}} sx={{display:'flex'}}>
                    <Typography sx={{mr: 1}}textAlign="center">{theme.palette.mode.charAt(0).toUpperCase() + theme.palette.mode.slice(1)} mode</Typography>
                    {theme.palette.mode === 'dark' ? <NightlightIcon /> : <Brightness4Icon />}
                  </Box>
                </MenuItem>
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Fab data-testid='createPostBtn' sx={{position:'fixed', bottom: 24, right: 24}} color="primary" aria-label="edit" onClick={() => navigate('/createPost')}>
        <EditIcon/>
      </Fab>
    </>
  );
};

export default NavBar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../stylesheets/navbar.scss";

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


const pages = [
  { title: 'Home', nav: '/' },
  { title: 'Create Post', nav: '/createPost' },
];
const settings = [
  { title: 'Profile', nav: '/profile' }, 
  { title: 'Signout', nav: '/' }
];

const NavBar = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState("roommate");

  const phrases = ["roommate", "future", "friend", "bed"];
  useEffect(() => {
    const index = phrases.indexOf(phrase);
    const newPhrase =
      index === phrases.length - 1 ? phrases[0] : phrases[index + 1];
    setTimeout(() => {
      setPhrase(newPhrase);
    }, 5000);
  }, [phrase]);

  const handleSignout = async () => {
    const res = await fetch("/signout");
    const data = res.json();
    if (data) {
      setUserInfo("");
      navigate('/')
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (nav) => {
    setAnchorElNav(null);
    navigate(nav)
  };

  const handleCloseUserMenu = (nav) => {
    setAnchorElUser(null);
    if (nav == '/') handleSignout()
    else navigate(nav)
  };

  return (
    <>
      <AppBar position="fixed" style={{background: '#98C1D9'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar 
              onClick={() => navigate('/')} 
              alt={userInfo.firstName} 
              sx={{ width: 112, 
                bgcolor: 'transparent', 
                display: { xs: 'none', sm: 'none', md: 'flex' }, 
                mr: 1 }} 
              variant='rounded'
            >
              <img className='navBarLogo' src="https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg" />
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
                  <MenuItem key={page.title} onClick={() => handleCloseNavMenu(page.nav)}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              sx={{
                mr: 2,
                display: { xs: 'flex', sm: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
              <Avatar onClick={() => navigate('/')} alt={userInfo.firstName} sx={{ width: 112, bgcolor: 'transparent' }} variant='rounded'>
                <img className='navBarLogo' src="https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg" />
              </Avatar>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              <Typography sx={{ my: 2, font:'DM Sans', fontSize: 28, fontWeight: '500', color: 'text.darkBlue', display: 'block' }}>
                find a {phrase}...
              </Typography>
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
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={() => handleCloseUserMenu(setting.nav)}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Fab sx={{position:'fixed', bottom: 24, right: 24}} color="primary" aria-label="edit" onClick={() => navigate('/createPost')}>
        <EditIcon/>
      </Fab>
    </>
  );
};

export default NavBar;

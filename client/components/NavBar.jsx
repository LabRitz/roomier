import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import Context from './context/Context';
import ColorModeContext from './context/ColorModeContext';
import Phrases from './Phrases';
import '../stylesheets/navbar.scss';

const pages = [
  { title: 'Home', nav: '/' },
  { title: 'Create Post', nav: '/createPost' },
];

function NavBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userInfo, setUserInfo, setAlert } = useContext(Context);
  const { toggleColorMode } = useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const toggleUserMenu = () => {
    setAnchorElUser(!anchorElUser);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page.nav) navigate(page.nav);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting.action) setting.action();
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/signout');
      if (res.status === 204) {
        setUserInfo('');
        navigate('/');
      }
    } catch (err) {
      console.log('ERROR: Cannot sign user out');
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred attempting to sign user out' }]);
    }
  };

  const settings = [
    {
      icon: <AccountCircleIcon />,
      name: 'Profile',
      action: () => navigate('/profile'),
    },
    {
      icon: (theme.palette.mode === 'dark') ? <Brightness4Icon /> : <NightlightIcon />,
      name: (theme.palette.mode === 'dark') ? 'Light mode' : 'Dark mode',
      action: () => {
        toggleColorMode();
        setAnchorElNav(null);
      },
    },
    {
      icon: <LogoutIcon />,
      name: 'Signout',
      action: () => handleSignout(),
    },
  ];

  return (
    <>
      <AppBar position="fixed" style={{ background: '#98C1D9' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              data-testid="menuHomeBtn"
              onClick={() => navigate('/')}
              alt={userInfo.firstName}
              sx={{
                width: 112,
                bgcolor: 'transparent',
                display: { xs: 'none', sm: 'none', md: 'flex' },
                mr: 1,
              }}
              variant="rounded"
            >
              <img className="navBarLogo" src="roomier.svg" alt="Roomier logo" />
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
            <Box sx={{ mr: 2, flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
              <Avatar data-testid="homeBtn" onClick={() => navigate('/')} alt={userInfo.firstName} sx={{ width: 112, bgcolor: 'transparent' }} variant="rounded">
                <img className="navBarLogo" src="roomier.svg" alt="Roomier logo" />
              </Avatar>
            </Box>
            <Box sx={{ ml: 1, flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              <Phrases />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <SpeedDial
                ariaLabel="User Setting Menu"
                sx={{ position: 'relative', top: '6px', color: '#3D5A80' }}
                icon={(
                  <Tooltip placement="left" title={anchorElUser ? 'Close settings' : 'Open settings'}>
                    <IconButton>
                      <Avatar alt={userInfo.firstName} sx={{ color: '#EAEAEA', bgcolor: '#3D5A80' }} src="/" />
                    </IconButton>
                  </Tooltip>
                )}
                onClick={toggleUserMenu}
                open={anchorElUser}
                direction="down"
              >
                {settings.map((setting, i) => (
                  <SpeedDialAction
                    sx={{ position: 'absolute', top: `${i * 64 + 64}px`, right: '0px' }}
                    key={setting.name}
                    icon={setting.icon}
                    tooltipTitle={setting.name}
                    onClick={() => handleCloseUserMenu(setting)}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Fab data-testid="createPostBtn" sx={{ position: 'fixed', bottom: 24, right: 24 }} color="primary" aria-label="edit" onClick={() => navigate('/createPost')}>
        <EditIcon />
      </Fab>
    </>
  );
}

export default NavBar;

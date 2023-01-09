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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';


const pages = [
  // { title: 'Create', nav: '/createPost' },
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
            <Avatar onClick={() => navigate('/')} alt={userInfo.firstName} sx={{ width: 112, bgcolor: 'transparent', display: { xs: 'none', md: 'flex' }, mr: 1 }} variant='rounded'>
              <img className='navBarLogo' src="https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg" />
            </Avatar>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={() => handleCloseNavMenu(page.nav)}>
                    <Typography color={'#293241'} textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Avatar alt={userInfo.firstName} sx={{ width: 112, bgcolor: 'transparent' }} variant='rounded'>
                <img className='navBarLogo' src="https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg" />
              </Avatar>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button sx={{ my: 2, color: '#293241', display: 'block' }}>
                find a {phrase}...
              </Button>
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
      <Fab sx={{position:'fixed', bottom: 24, right: 24}} color="#3D5A80" aria-label="edit">
        <EditIcon onClick={() => navigate('/createPost')}/>
      </Fab>
    </>
  );

  // return (    
  //   <div className="nav">
  //     <div className="leftBtn">
  //       <Link
  //         to={{pathname:'/'}}
  //       >
  //         <img src="https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg" />
  //       </Link>
  //       <Link
  //         to={{pathname:'/'}}
  //       >
  //         <h1>find a {phrase}...</h1>
  //       </Link>
  //     </div>
  //     <div className="rightBtn">
  //       <Link
  //         to={{
  //           pathname: "/createPost",
  //         }}
  //       >
  //         <button className="post">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="32"
  //             height="32"
  //             fill="currentColor"
  //             className="bi bi-file-earmark-arrow-up"
  //             viewBox="0 0 16 16"
  //           >
  //             <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
  //             <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
  //           </svg>
  //         </button>
  //       </Link>
  //       <Link
  //         to={{
  //           pathname: "/profile",
  //         }}
  //       >
  //         <button className="textBtn version profile">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="32"
  //             height="32"
  //             fill="currentColor"
  //             className="bi bi-person-lines-fill"
  //             viewBox="0 0 16 16"
  //           >
  //             <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
  //           </svg>
  //         </button>
  //       </Link>
  //       <Link
  //         to={{pathname:'/'}}
  //       >
  //         <button
  //           className="textBtn version profile"
  //           onClick={() => handleSignout()}
  //         >
  //           Signout
  //         </button>
  //       </Link>
  //     </div>
  //   </div>
  // );
};

export default NavBar;

import React from 'react';
import './../../styles/variables.scss';
import { Link } from 'react-router-dom';
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
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTranslation } from 'react-i18next';
import en from './../../locales/en.json';

export const NavMenu: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const pages = t('header', { returnObjects: true }) as string[];
  const settings = t('settings', { returnObjects: true }) as string[];

  const headerArray = en.header;

  const pagesEn = pages.map((page, index) => {
    return [page, headerArray[index]];
  });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#F6DE01',
      }}
    >
      <nav>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to='/'>
              <SolarPowerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#000000', fontSize: '1.5rem' }} />
            </Link>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={Boolean(anchorElNav)}
              onOpen={handleOpenNavMenu}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesEn.map((page) => (
                <Link className='link' to={page[1].toLowerCase()} key={page[1]} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseNavMenu} sx={{ color: 'var(--header-title)' }}>
                    <Typography textAlign="center" sx={{ color: 'var(--header-title)', m: 1 }}>
                      {page[0]}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </SwipeableDrawer>
            </Box>
            <Link to='/' style={{ margin: '0 auto' }}>
              <SolarPowerIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#ffffff' }} />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pagesEn.map((page) => (
                <Link to={page[1].toLowerCase()} key={page[1]} style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'var(--header-title)', display: 'block' }}
                  >
                    {page[0]}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </nav>
    </AppBar>
  );
}

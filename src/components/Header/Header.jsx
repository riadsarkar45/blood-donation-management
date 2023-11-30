import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../AuthProvider/AuthProvider';

const drawerWidth = 240;

function Header(props) {
    const { user, logOut } = useContext(AuthContext);
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate("/signin")
            })
            .catch(error => console.error(error))
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding sx={{ flexDirection: 'column', textAlign: 'center' }}>
                    <ListItemButton>
                        <Link to="/">Home</Link>
                    </ListItemButton>

                    {user ? (
                        <>
                            <ListItemButton>
                                <Link to="/blog">Blog</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/donation-request">Donation Requests</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/search">Search Donors</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/dashboard">Dashboard</Link>
                            </ListItemButton>
                        </>
                    ) : (
                        <>

                            <ListItemButton>
                                <Link to="/search">Search Donors</Link>
                            </ListItemButton>
                            <ListItemButton>
                                <Link to="/blog">Blog</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/signin">Login</Link>
                            </ListItemButton>


                            <ListItemButton>
                                <Link to="/registration">Registration</Link>
                            </ListItemButton>
                        </>
                    )}
                </ListItem>


            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Container maxWidth="lg">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <div className='flex items-center'>
                                <div>
                                    <img className='w-[34%]' src="https://i.ibb.co/NsBhgVw/240-F-442372738-Robd0-Qmr-KUOd-Qk-ZW4-TQVJi-BEd5kr-Zcx-N-removebg-preview-1.png" alt="" />

                                </div>
                            </div>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                            {/* TODO:)=> Non login users will see this */}

                            <NavLink to="/">
                                <Button sx={{ color: '#fff' }}>
                                    Home
                                </Button>
                            </NavLink>

                            {
                                user ? (
                                    <>
                                        <Button sx={{ color: '#fff' }}>
                                            <Link to="/blog">Blog</Link>
                                        </Button>
                                        <NavLink to="/donation-request">

                                            <Button sx={{ color: '#fff' }}>
                                                Donation Requests
                                            </Button>
                                        </NavLink>

                                        <NavLink to="/search">
                                            {/* <Button>
                                        Search Donors
                                    </Button> */}
                                            <Button sx={{ color: '#fff' }} variant="outlined">Search Donors</Button>
                                        </NavLink>

                                        {/* dashboard will see logged in user */}



                                        <NavLink to="/dashboard">
                                            <Button sx={{ color: '#fff' }}>
                                                Dashboard
                                            </Button>
                                        </NavLink>

                                        <Button onClick={handleLogout} sx={{ color: '#fff' }}>
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>


                                        <NavLink to="/donation-request">

                                            <Button sx={{ color: '#fff' }}>
                                                Donation Requests
                                            </Button>
                                        </NavLink>

                                        <Button sx={{ color: '#fff' }}>
                                            <Link to="/blog">Blog</Link>
                                        </Button>

                                        <NavLink to="/signin">
                                            <Button sx={{ color: '#fff' }}>
                                                Login
                                            </Button>
                                        </NavLink>

                                        <NavLink to="/registration">
                                            <Button sx={{ color: '#fff' }}>
                                                Registratoin
                                            </Button>
                                        </NavLink>

                                    </>
                                )
                            }


                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}



export default Header;
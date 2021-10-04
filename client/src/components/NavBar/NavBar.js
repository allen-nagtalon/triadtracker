import React from 'react'
import { makeStyles } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const NavBar = props => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                flexGrow: 1,
            }}
        >
            <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1}}>
                        <Link href="/" color="inherit" underline="none">
                            Home
                        </Link>
                    </Typography>
                    <Typography component="div" sx={{ flexGrow: 1}}>
                        <Link href="/cards" color="inherit" underline="none">
                            Cards
                        </Link>
                    </Typography>
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
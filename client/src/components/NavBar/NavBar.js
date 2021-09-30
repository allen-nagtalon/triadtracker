import React from 'react'
import { NavLink } from 'react-router-dom'

import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

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
                    <Link href="/" color="secondary" underline="none">
                        Home
                    </Link>
                    <Link href="/cards" color="secondary" underline="none">
                        Cards
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
import React from 'react'
import { Container, Paper, Typography, Box } from '@mui/material'

const Landing = _ => {
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ px: 6, pt: 4, pb: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h2'>
            Welcome to TriadTracker
          </Typography>
          <Typography variant='h6'>
            A site for all Final Fantasy XIV Triple Triad card collectors.
          </Typography>
        </Box>
        <hr />
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant='h5'>
            Simple And Clean
          </Typography>
          <Typography>
            Create an account to organize your card collection in conjuction with your in-game list.
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>
            Always Striving For Improvement
          </Typography>
          <Typography>
            I aim to continue improving the user's experience with TriadTracker; planned features and QoL changes will be added over time, such as group making for comparing cards, easier card selection UI, and overall site optimization.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Landing

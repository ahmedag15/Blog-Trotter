import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [value, setValue] = useState();


  return (
    <AppBar position='sticky' sx={{
      background:
        "linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(0,58,161,1) 36%, rgba(0,212,255,1) 100%);"
    }}
    >
      <Toolbar>
        <Typography variant='h4'>Blog Trotter</Typography>

        {isLoggedIn &&
          <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
            </Tabs>
          </Box>
        }

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn &&
            <>
              <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Login</Button>
              <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Sign Up</Button>
            </>
          }
          {isLoggedIn &&
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Logout</Button>
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
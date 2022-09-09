import React from 'react'

import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {}

const Navigation = (props: Props) => {
  return (
    <nav className='left-nav'>
    <h1><span className="logo">fotostash</span></h1>
    <Stack>
        <Button component={Link} to="/">All Photos</Button>
        <Button component={Link} to="/albums">Albums</Button>
        <Button component={Link} to="/upload">Upload</Button>
    </Stack>
  </nav>
  )
}

export default Navigation
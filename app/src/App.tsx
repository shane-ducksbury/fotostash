import React from 'react';
import 'normalize.css';
import './style.css';

import { Box, Button, Stack } from '@mui/material';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <nav className='left-nav'>
        <h1><span className="logo">fotostash</span></h1>
        <Stack>
          <Button>All Photos</Button>
          <Button>Upload</Button>
        </Stack>
      </nav>
      <main>
        <Upload></Upload>
      </main>
    </div>
  );
}

export default App;

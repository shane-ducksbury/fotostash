import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5';

type Props = {
    setParentToStaleCallback: () => void; 
}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const CreateNewAlbumButton = ({ setParentToStaleCallback }: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const [textContent, setTextContent] = useState<string>();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        axios.post(
            API_URL + "/albums/",
            {"name": textContent}
            )
        setParentToStaleCallback();
        handleClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextContent(event.target.value);
      };

    return (
        <>
            <Button onClick={handleClickOpen}><IoAddCircleOutline fontSize={'1.2rem'} /> New Album</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Enter a New Album Name</DialogTitle>
                <DialogContent sx={{"width": "400px"}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Album Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create New Album</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreateNewAlbumButton
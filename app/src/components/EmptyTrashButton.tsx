import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

type Props = {}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const EmptyTrashButton = (props: Props) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const emptyTrashHandler = () => {
        emptyTrash();
        setDialogOpen(false);
    }

    const emptyTrash = async () => {
        await axios.delete(`${API_URL}/images/trash`);
    }

    return (
        <>
            <Button color="error" onClick={() => {setDialogOpen(true)}}>Empty Trash</Button>
            <Dialog 
                open={dialogOpen}
                >
                    <DialogTitle>
                        Are you sure you want to empty the Trash?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            All photos in the trash will be permanently deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setDialogOpen(false) }}>Cancel</Button>
                        <Button color='warning' onClick={() => {emptyTrashHandler()}} >Empty Trash</Button>
                    </DialogActions>
            </Dialog>
        </>
    )
}

export default EmptyTrashButton
import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'

type Props = {}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const EmptyTrashButton = (props: Props) => {
    const emptyTrashHandler = () => {
        emptyTrash();
    }

    const emptyTrash = async () => {
        await axios.delete(`${API_URL}/images/trash`);
    }

    return (
        <Button color="error" onClick={emptyTrashHandler}>Empty Trash</Button>
    )
}

export default EmptyTrashButton
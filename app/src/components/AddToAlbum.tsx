import { Button, Menu, MenuItem } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import Album from "../interfaces/Album";

type Props = {
    imageId: string;
}

const API_ENDPOINT = "http://localhost:5050"

const AddToAlbum = ({imageId}: Props) => {
    const [albums, setAlbums] = useState<Album[]>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(open){
            axios.get(API_ENDPOINT + '/albums/')
            .then(response => setAlbums(response.data))
        }
    },[open])
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    const addToAlbum = (albumId: string, imageId: string) => {
        axios.post(
            API_ENDPOINT + '/albums/' + albumId + '/add-image',
            {"imageId": imageId}
            )
        .then(response => console.log(response))
        handleClose();
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Add to Album
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {albums ? 
                albums.map(album => {
                    return(<MenuItem onClick={() => addToAlbum(album.id, imageId)}>{album.name}</MenuItem>)
                    }) 
                : null}
            </Menu>
        </div>
    )
}

export default AddToAlbum
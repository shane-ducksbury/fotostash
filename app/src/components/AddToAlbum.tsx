import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { IoAdd, IoAlbumsOutline } from "react-icons/io5";
import Album from "../interfaces/Album";
import Image from "../interfaces/Image";

type Props = {
    images: Image[];
    color: string;
    clearSelectionCallback?: () => void;
}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const AddToAlbum = ({ images, color, clearSelectionCallback }: Props) => {
    const [albums, setAlbums] = useState<Album[]>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(open){
            axios.get(API_URL + '/albums/')
            .then(response => setAlbums(response.data))
        }
    },[open])
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        if(clearSelectionCallback){
            clearSelectionCallback();
        }
      };

    const addToAlbum = (albumId: string, images: Image[]) => {
        images.forEach(i => {
            axios.post(
                API_URL + '/albums/' + albumId + '/add-image',
                {"imageId": i.id}
                )
            })
        handleClose();
    }

    return (
        <div>
            <Tooltip title='Add to Album'>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <IoAdd color={color}/>
                </IconButton>
            </Tooltip>
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
                    return(<MenuItem key={album.id} onClick={() => addToAlbum(album.id, images)}>{album.name}</MenuItem>)
                    }) 
                : <MenuItem onClick={() => {return(null)}}>Create New Album</MenuItem>}
            </Menu>
        </div>
    )
}

export default AddToAlbum
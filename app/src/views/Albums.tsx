import { Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CreateNewAlbumButton from "../components/CreateNewAlbumButton"

import Album from '../interfaces/Album'

type Props = {

}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const Albums = (props: Props) => {

    const [albums, setAlbums] = useState<Album[]>([]);
    const [staleAlbums, setStaleAlbums] = useState<boolean>(true);

    const getAlbums = () => {
        return axios.get(`${API_URL}/albums`)
        .then(response => setAlbums(response.data))
    }

    useEffect(() => {
        if(staleAlbums) {
            getAlbums();
            setStaleAlbums(false);
        }
    },[staleAlbums])

    const forceAlbumRefresh = () => {
        setStaleAlbums(true);
    }

    return(
        <div className="albums-page-wrapper">
            <h1>Albums</h1>
            {albums ? albums.map(album => {
                return(<Link key={album.id} to={`/albums/${album.id}`}>{album.name}</Link>)
            })
            : "No Data"}
            <CreateNewAlbumButton setParentToStaleCallback={forceAlbumRefresh} />
        </div>
    )
}

export default Albums
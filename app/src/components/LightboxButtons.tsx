import React from 'react'
import AddToAlbum from './AddToAlbum'
import SendToTrashButton from './SendToTrashButton'
import Image from "../interfaces/Image"
import CloseLightboxButton from './CloseLightboxButton'
import RemoveFromAlbumButton from './RemoveFromAlbumButton'
import { useParams } from 'react-router-dom'


type Props = {
    image: Image;
    handleForceParentRerender: () => void;
    handleCloseModal: () => void;
}

const LightboxButtons = ({image, handleForceParentRerender, handleCloseModal}: Props) => {

    const { albumId } = useParams();

    return (
        <>
            <div className="lightbox-controls">
                <CloseLightboxButton handleCloseModal={handleCloseModal} />
                <div>
                    <SendToTrashButton images={[image]} handleForceParentRerender={handleForceParentRerender} color={'#FAFAFA'} />
                    {albumId ? <RemoveFromAlbumButton imageId={image.id} albumId={albumId} /> : <AddToAlbum images={[image]} color={'#FAFAFA'} />}
                </div>
            </div>
        </>
    )
}

export default LightboxButtons
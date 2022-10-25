import React from 'react'
import AddToAlbum from './AddToAlbum'
import SendToTrashButton from './SendToTrashButton'
import Image from "../interfaces/Image"
import CloseLightboxButton from './CloseLightboxButton'


type Props = {
    image: Image;
    handleForceParentRerender: () => void;
    handleCloseModal: () => void;
}

const LightboxButtons = ({image, handleForceParentRerender, handleCloseModal}: Props) => {
    return (
    <div className="lightbox-controls">
        <SendToTrashButton imageId={image.id} handleForceParentRerender={handleForceParentRerender} />
        <AddToAlbum imageId={image.id} />
        <CloseLightboxButton handleCloseModal={handleCloseModal} />
    </div>
    )
}

export default LightboxButtons
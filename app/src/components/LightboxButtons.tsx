import React from 'react'
import AddToAlbum from './AddToAlbum'
import SendToTrashButton from './SendToTrashButton'
import Image from "../interfaces/Image"

type Props = {
    image: Image;
    handleForceParentRerender: () => void;
}

const LightboxButtons = ({image, handleForceParentRerender}: Props) => {
    return (
    <div className="lightbox-controls">
        <SendToTrashButton imageId={image.id} handleForceParentRerender={handleForceParentRerender} />
        <AddToAlbum imageId={image.id} />
    </div>
    )
}

export default LightboxButtons
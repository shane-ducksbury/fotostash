import { Button } from '@mui/material';
import Image from '../interfaces/Image'
import AddToAlbum from './AddToAlbum';
import AlbumImagePreview from './AlbumImagePreview';
import SendToTrashButton from './SendToTrashButton';

interface Props {
    image: Image;
    modalHandler: (params: Image) => void;
    rerenderHandler: () => void;
}

const AlbumPreviewCard = ({image, modalHandler, rerenderHandler}: Props) => {
  return (
    <div key={image.id} className="album-image-card">
        <div onClick={() => modalHandler(image)}>
            <AlbumImagePreview image={image} />
        </div>
        <AddToAlbum imageId={image.id} />
        <SendToTrashButton imageId={image.id} handleForceParentRerender={rerenderHandler} />
    </div>
  )
}

export default AlbumPreviewCard
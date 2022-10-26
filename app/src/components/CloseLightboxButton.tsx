import { IconButton, Tooltip } from '@mui/material'
import { IoArrowBack, IoCloseCircleOutline } from 'react-icons/io5'
import React from 'react'

type Props = {
    handleCloseModal: () => void;
}

const CloseLightboxButton = ({ handleCloseModal }: Props) => {
    return (
        <div>
            <Tooltip title='Back'>
                <IconButton
                    id="basic-button"
                    onClick={handleCloseModal}
                >
                    <IoArrowBack color="#FAFAFA" />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default CloseLightboxButton
import { LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface UploadProgressBarProps {
    progress: number;
    currentIndex: number;
    totalFiles: number;
    currentFilename?: string;
}

const UploadProgressBar = ({ progress, currentIndex, totalFiles }: UploadProgressBarProps) => {
    const [currentProgress, setCurrentProgress] = useState<number>(0);

    useEffect(() => {
        setCurrentProgress(((totalFiles / 100) * currentIndex) + progress)
    },[progress])

    return (
        <div className='progress-bar-wrapper'>
            <h1>Uploading file {currentIndex} of {totalFiles}</h1>
            <LinearProgress variant="determinate" value={currentProgress} sx={{ width: '90%' }} />
        </div>
    )
}

export default UploadProgressBar
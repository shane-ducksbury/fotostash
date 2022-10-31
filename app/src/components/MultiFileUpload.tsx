import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileError, FileRejection } from "react-dropzone";
import UploadProgressBar from "./UploadProgressBar";

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

export interface UploadableFile {
    file: File;
    errors: FileError[];
}

// To be implemented
// Accept files - typescript problems

const MultiFileUpload = () => {
    const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
        const mappedAcc = accFiles.map(file => ({file, errors: []}));
        setFiles(curr => [...curr, ...mappedAcc, ...rejFiles]);
        setFileDragOver(false);
    }, [])

    const [files, setFiles] = useState<UploadableFile[]>([]);
    const [erroredFiles, setErroredFiles] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);
    // const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [filesLength, setFilesLength] = useState<number>(0);

    const [fileDragOver, setFileDragOver] = useState<boolean>(false);

    
    const handleFileSubmit = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post(`${API_URL}/images/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: (progressEvent: ProgressEvent) => {
                // This is ready for the upload progress thing
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                setProgress(progress);
              },
            })
            return response;
        } catch(err: any) {
            return err.response;
        }
    }

    const handleSubmit = async () => {
        if(files.length > 0){
            setFilesLength(files.length);
            files.forEach(async (fileWrapper, index) => {
                setCurrentIndex(index);
                const res = await handleFileSubmit(fileWrapper.file);
                if(res.status === 500){
                    setErroredFiles([...erroredFiles, fileWrapper.file.name]);
                }
            })
            setFiles([]);
        }
    }

    useEffect(() => {
        if(files.length > 0){
            handleSubmit();
        }
    },[files])

    useEffect(() => {
        if(progress === 100) setProgress(0);
    },[progress])

    return(
        <>
            {erroredFiles.length > 0 ? <p>The following files failed to upload {erroredFiles.map(file => {return(file + ', ')})} </p> : null}
                {progress === 0 
                ? <div {...getRootProps({className: 'dropzone'})} onDragOver={(e) => setFileDragOver(true)} onDragLeave={e => setFileDragOver(false)} >
                    <input {...getInputProps()} />
                    {
                        fileDragOver ? <h1>Release to upload</h1> 
                        :
                    <h1>Drop Images Anywhere to Upload, Or Click to Add</h1>                    
                    }
                </div>
                : <UploadProgressBar 
                progress={progress} 
                currentIndex={currentIndex} 
                totalFiles={filesLength}
                />}
        </>
    )
}

export default MultiFileUpload
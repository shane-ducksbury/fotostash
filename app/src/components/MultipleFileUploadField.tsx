import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


// To be implimented

const MultiFileUpload = () => {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {

    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and Drop some files here</p>
        </div>
    )



}

export default MultiFileUpload
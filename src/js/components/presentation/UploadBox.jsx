import React, {useMemo} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import {useDropzone} from "react-dropzone";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const UploadBox = ({handleChange}) => {

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'text/csv', multiple: false, classname: 'dropzone', onDropAccepted: (event) => {
            console.log(event)
            handleChange(event)
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);


    return (
        <div className="upload-box container" {...getRootProps({style})}>
            <input type="file" className="hidden" {...getInputProps()}/>
            <Typography color="textSecondary">
                {isDragReject ? 'Sorry we only accept csv file types' : 'Drag CSV file here or click to upload your CSV!'}
            </Typography>
        </div>
    );
};


UploadBox.propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default UploadBox
import React from "react";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import UploadBox from "../presentation/UploadBox";
import CardActions from "@material-ui/core/CardActions";
import StyledButton from "../presentation/StyledButton";
import filesize from "filesize";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiService from "../../service/ApiService";
import {showSuccessNotification, showErrorNotification} from "../../service/NotificationService"

class CsvUploader extends React.Component {


    constructor() {
        super();
        this.state = {
            file: null,
            uploading: false,
            title: "Upload",
            uploadProgress: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.api = new ApiService();
    }

    handleChange(event) {
        this.setState({
            file: event[0]
        });
    };

    handleUploadClick() {
        this.setState({
            uploading: true
        });
        const progressSubs = this.api.progressListener.subscribe({
            next: (progress) => {
                this.setState({
                    uploadProgress: progress
                });
            }
        });
        const uploadSubs = this.api.uploadFile(this.state.file)
            .subscribe({
                next: ({data} = value) => {
                    if (!data.error) {
                        showSuccessNotification('File successfully imported');
                        this.props.uploadSuccess(this.state.file)
                    } else {
                        showErrorNotification(data.message)
                    }
                    uploadSubs.unsubscribe();
                    progressSubs.unsubscribe()
                },
                error: () => {
                    showErrorNotification('Oops, sorry that import failed. Please try again');
                    uploadSubs.unsubscribe();
                    progressSubs.unsubscribe()
                }

            })

    }

    render() {
        const {title, file, uploading, uploadProgress} = this.state;
        return (
            <Card className="card">
                <CardHeader title={title}/>
                <CardContent>
                    <UploadBox handleChange={this.handleChange}/>
                    {
                        file ?
                            <div className="file-name">
                                <h4>{file.name}</h4>
                                <span className="file-size">{filesize(file.size)}</span>
                            </div> : null
                    }
                </CardContent>
                {
                    file ?
                        <CardActions className="container">
                            {
                                !uploading ?
                                    <StyledButton text={"Upload to server!"} clickHandler={this.handleUploadClick}/> :
                                    <CircularProgress color="secondary" variant="determinate" value={uploadProgress}/>}
                        </CardActions>
                        : null
                }
            </Card>

        );
    }
}
export default CsvUploader

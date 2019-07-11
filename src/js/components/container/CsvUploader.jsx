import React from "react";
import "../../../css/csvuploader.css";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import UploadBox from "../presentation/UploadBox";
import CardActions from "@material-ui/core/CardActions";
import StyledButton from "../presentation/StyledButton";
import filesize from "filesize";
import CircularProgress from "@material-ui/core/CircularProgress";


class CsvUploader extends React.Component {


    constructor() {
        super();
        this.state = {
            file: null,
            uploaded: false,
            uploading: false,
            title: "Upload"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            file: event[0]
        });
    };

    handleUploadClick() {
        this.setState({
            uploading: true
        })
    }

    render() {
        const {title, file, uploading} = this.state;
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
                                    <CircularProgress color="secondary"/>}
                        </CardActions>
                        : null
                }
            </Card>

        );
    }
}
export default CsvUploader

import React from "react";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {hot} from "react-hot-loader";
class CsvUploader extends React.Component {
    constructor() {
        super();
        this.state = {
            file: null,
            seo_title: ''
        };
    }


    render() {
        return (
            <Container maxWidth="sm">

            </Container>
        );
    }
}
export default hot(module)(CsvUploader)

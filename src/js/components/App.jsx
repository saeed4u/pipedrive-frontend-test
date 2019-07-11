import React from "react";

import "../../css/csvuploader.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {hot} from "react-hot-loader";
import CsvUploader from "./container/CsvUploader";


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            uploaded: false,
        };
        this.handleUploadedEvent = this.handleUploadedEvent.bind(this);
    }

    handleUploadedEvent() {

    }

    render() {
        const classes = makeStyles(theme => ({
            title: {
                flexGrow: 1,
            },
        }));

        return (
            <div className="main-div">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Pipedrive Frontend test
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="md" className="container">
                    {!this.state.uploaded ? <CsvUploader/> : null}
                </Container>
            </div>
        )
    }
}
export default hot(module)(App)
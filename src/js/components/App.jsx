import React from "react";

import "../../css/csvuploader.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {hot} from "react-hot-loader";
import CsvUploader from "./container/CsvUploader";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutoSuggest from "./container/AutoSuggest";


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            uploaded: false,
        };
        this.handleUploadedEvent = this.handleUploadedEvent.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);
        this.names = [];
    }

    handleUploadedEvent(file) {
        const csvReader = new FileReader();
        csvReader.onload = (e) => {
            this.parseCSV(e.target.result)
        };
        csvReader.readAsText(file);
        this.setState({
            uploaded: true
        });
    }

    handleSearchEvent(query){
        //console.log(query);
    }

    parseCSV(text) {
        const lines = text.split("\n");
        lines.forEach((line) => {
            const columns = line.split(",");
            if (columns.length > 1) {
                this.names.push(columns[1]);
            }
        });
        console.log(this.names);
    }

    render() {
        const classes = makeStyles(theme => ({
            title: {
                flexGrow: 1,
            },
        }));

        return (
            <div className="main-div">
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Pipedrive Frontend test
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="md" className="container">
                    {!this.state.uploaded ? <CsvUploader uploadSuccess={this.handleUploadedEvent}/> :

                        <AutoSuggest names={this.names}/>
                    }
                </Container>
                <ToastContainer />
            </div>
        )
    }
}
export default hot(module)(App)
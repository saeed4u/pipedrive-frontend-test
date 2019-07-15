import React, {Component} from "react";
import PropTypes from "prop-types";
import {fade, makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import {deburr} from "lodash";
import Autosuggest from "react-autosuggest";
import Paper from "@material-ui/core/es/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/es/Button";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/es/CircularProgress";
import {green} from "@material-ui/core/colors";
import ApiService from "../../service/ApiService";
import {VirtualizedTable} from "./VirtualizedTable";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {showErrorNotification, showSuccessNotification} from "../../service/NotificationService";

const renderInputComponent = (inputProps) => {
    const {
        loading, setLoading, setSearchResults, state, classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;

    const handleSearchEvent = () => {
        setLoading(true);
        setSearchResults([]);
        const api = new ApiService();
        const subs = api.search(state.single)
            .subscribe({
                next: ({data} = response) => {
                    const results = data.results;
                    if (results && results.length) {
                        setSearchResults(results);
                    } else {
                        showSuccessNotification('Sorry your query returned empty results');
                    }
                    setLoading(false);
                    if (subs) {
                        subs.unsubscribe()
                    }
                },
                error: error => {
                    console.log(error);
                    showErrorNotification('Oops, sorry that query failed. Please try again');
                    setLoading(false);
                }
            })
    };
    const buttonClassName = clsx({
        [classes.buttonSuccess]: true,
    });

    return (
        <div>
            <TextField
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.inputInput,
                    },
                }}
                {...other}
            />
            <Button
                variant="contained"
                color="secondary"
                className={buttonClassName}
                disabled={!state.single || loading}
                onClick={handleSearchEvent}
            >
                Search
            </Button>
            {loading && <CircularProgress color="secondary" size={24} className={classes.buttonProgress}/>}
        </div>
    );

};


const renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{fontWeight: part.highlight ? 500 : 400}}>
            {part.text}
          </span>
                ))}
            </div>
        </MenuItem>
    );
};

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({label: PropTypes.string}).isRequired,
};

const getSuggestions = (suggestions, value, {showEmpty = false} = {}) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
};

const getSuggestionValue = (suggestion) => suggestion;

const tableStyles = theme => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(.2),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    search: {
        display: 'flex',

        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    inputInput: {
        padding: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        }
    }, button: {
        margin: theme.spacing(1),
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -18,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

const CustomTable = withStyles(tableStyles)(VirtualizedTable);

const AutoSuggest = ({names}) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        single: '',
    });


    const [loading, setLoading] = React.useState(false);

    const [stateSuggestions, setSuggestions] = React.useState([]);

    const [stateSearchResults, setSearchResults] = React.useState([]);

    const handleSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(names, value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, {newValue}) => {
        setState({
            ...state,
            [name]: newValue,
        });
    };


    const autoSuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    const columns = [
        {
            width: 100,
            label: 'ID',
            dataKey: 'id',
            numeric: true
        },
        {
            width: 200,
            label: 'Name',
            dataKey: 'name',
        },
        {
            width: 100,
            label: 'Age',
            dataKey: 'age',
        },
        {
            width: 250,
            label: 'Address',
            dataKey: 'address',
        }, {
            width: 150,
            label: 'Team',
            dataKey: 'team',
        },
    ];

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autoSuggestProps}
                inputProps={{
                    loading,
                    setLoading,
                    setSearchResults,
                    classes,
                    state,
                    id: '',
                    label: 'Who are you looking for?',
                    placeholder: 'Who are you looking for?',
                    value: state.single,
                    onChange: handleChange('single')
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
            {stateSearchResults.length ?
                <Paper style={{height: 400, width: '100%'}}>
                    <CustomTable
                        rowCount={stateSearchResults.length}
                        rowGetter={({index}) => stateSearchResults[index]}
                        columns={columns}
                    >

                    </CustomTable>
                </Paper> : null}
        </div>
    );
};

AutoSuggest.propTypes = {
    names: PropTypes.array.isRequired,
};
export default AutoSuggest;



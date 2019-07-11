import React from "react";
import {styled} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const CustomButton = styled(Button)({
    background: 'linear-gradient(45deg, #304ffe 30%, #0026ca 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(48, 79, 254, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});

const StyledButton = ({text, clickHandler}) => {
    return <CustomButton onClick={clickHandler}>{text}</CustomButton>
};

StyledButton.propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default StyledButton
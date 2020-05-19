import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import VisibilityIcon from '@material-ui/icons/Visibility';

import tooltipStyles from "assets/jss/material-dashboard-react/tooltipStyle.js";

// colors
import { purple } from "@material-ui/core/colors";


const toolTipUseStyles = makeStyles(tooltipStyles);

export default function TransactionButton(props) {

    const toolTipClasses = toolTipUseStyles();

    const { transactions } = props;

    let toolTipText = '';

    for (let i = 0; i < transactions.length; i++) {

        toolTipText +=
            String(transactions[i].createdAt).split('T')[0] + '\n' +
            '+' + transactions[i].details.transactionAmount.toFixed(2) +
            '\n\n\n'
    }

    toolTipText = (
        <div style={{ whiteSpace: 'pre-line' }}>
            {
                toolTipText
            }
        </div>
    )

    const transactionsButton = (
        <Tooltip
            id="tooltip-top"
            title={toolTipText}
            placement="top"
            classes={{ tooltip: toolTipClasses.tooltip }}
        >
            <IconButton size="small"
                aria-label="details"
                style={{ color: purple[500], margin: '0 0 0 25px' }}
            >
                <VisibilityIcon />
            </IconButton>
        </Tooltip>
    )



    return (
        <div >
            {transactionsButton}
        </div>
    );
}

TransactionButton.propTypes = {
    transactions: PropTypes.object
};

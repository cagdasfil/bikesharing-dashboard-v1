import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Slide from '@material-ui/core/Slide';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import tooltipStyles from "assets/jss/material-dashboard-react/tooltipStyle.js";

// colors
import { purple } from "@material-ui/core/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);
const toolTipUseStyles = makeStyles(tooltipStyles);

export default function UserReportButton(props) {

    const classes = useStyles();
    const toolTipClasses = toolTipUseStyles();

    const { operation, report, formControlProps } = props;

    const adminComments = report.adminComments ? report.adminComments : ""

    const details = (
        <div style={{ whiteSpace: 'pre-line' }}>
            {
                "Description : \n\n"
                +
                report.description
                +
                '\n \n \n'
                +
                "Admin Comments:  \n\n "
                +
                adminComments
                +
                '\n'
            }
        </div>
    )

    const detailsButton = (
        <Tooltip
            id="tooltip-top"
            title={details}
            placement="top"
            classes={{ tooltip: toolTipClasses.tooltip }}
        >
            <IconButton size="small"
                aria-label="details"
                style={{ color: purple[500], margin: '0 0 0 7px' }}
            >
                <VisibilityIcon />
            </IconButton>
        </Tooltip>
    )


    const updateButton = (
        <Tooltip
            id="tooltip-top"
            title="Update"
            placement="top"
            classes={{ tooltip: toolTipClasses.tooltip }}
        >
            <IconButton size="small"
                {...formControlProps}
                aria-label="update"
                style={{ color: purple[500], margin: '0 0 0 5px' }}
            >
                <ArrowDownwardIcon />
            </IconButton>
        </Tooltip>
    )


    return (
        <div >
            {operation === "details"
                ?
                detailsButton
                :
                updateButton
            }
        </div>
    );
}

UserReportButton.propTypes = {
    operation: PropTypes.string,
    report: PropTypes.object,
    formControlProps: PropTypes.object
};

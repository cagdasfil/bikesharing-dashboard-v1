import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import BlockIcon from '@material-ui/icons/Block';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// colors
import { purple } from "@material-ui/core/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

export default function UserButton(props) {

    const classes = useStyles();
    const { operation, user } = props;

    const successAlert = () => {
        window.location.reload(false);
        console.log("Success!")
    }

    const warningAlert = () => {
        console.log("Fail!")
    }

    const [blockOpen, setBlockOpen] = React.useState(false);
    const [adminOpen, setAdminOpen] = React.useState(false);

    const handleClickBlock = () => {
        setBlockOpen(true);
    };

    const handleClickAdmin = () => {
        setAdminOpen(true);
    };

    const handleClose = () => {
        setAdminOpen(false);
        setBlockOpen(false);
    };

    const handleBlock = () => {

        fetch('http://35.189.94.121/users/' + user.id, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "blocked": true
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            responseData.id ? successAlert() : warningAlert()
        })
    }

    const handleAdmin = () => {

        fetch('http://35.189.94.121/application/setAdmin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": user.id
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            responseData.status === 200 ? successAlert() : warningAlert()
        })
    }

    const userBlockButton = (
        <Tooltip
            id="tooltip-top"
            title="Block"
            placement="top"
        >
            <IconButton size="small"
                aria-label="Block"
                className={classes.tableActionButton}
                onClick={handleClickBlock}
                style={{ color: purple[500] }}
            >
                <BlockIcon />
            </IconButton>
        </Tooltip>
    )

    const userBlockButtonDisabled = (

        <IconButton size="small"
            aria-label="Block"
            className={classes.tableActionButton}
            onClick={handleClickBlock}
            style={{ color: purple[100] }}
            disabled
        >
            <BlockIcon />
        </IconButton>

    )

    const setAdminButton = (
        <Tooltip
            id="tooltip-top"
            title="Set Admin"
            placement="top"
        >
            <IconButton size="small"
                aria-label="Set-Admin"
                className={classes.tableActionButton}
                onClick={handleClickAdmin}
                style={{ color: purple[500], margin: '0 0 0 15px' }}
            >
                <SupervisorAccountIcon />
            </IconButton>
        </Tooltip>
    )

    const setAdminButtonDisabled = (
        <IconButton size="small"
            aria-label="Set-Admin"
            className={classes.tableActionButton}
            onClick={handleClickAdmin}
            style={{ color: purple[100], margin: '0 0 0 15px' }}
            disabled
        >
            <SupervisorAccountIcon />
        </IconButton>
    )

    const open = operation === 'block' ? blockOpen : adminOpen

    const popup = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {operation === "block"
                    ?
                    "Block User?"
                    :
                    "Set System Admin?"
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {operation === "block"
                        ?
                        "You are blocking a user. This means the user can not use BikeSharing anymore."
                        :
                        "You are setting the user as a system admin. This means the user will have admin permissions anymore."
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: purple[500] }}>
                    CANCEL
                </Button>
                {operation === "block"
                    ?
                    <Button onClick={handleBlock} style={{ color: purple[500] }}>
                        BLOCK
                    </Button>
                    :
                    <Button onClick={handleAdmin} style={{ color: purple[500] }}>
                        SET ADMIN
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )

    return (
        <div >
            {operation === "block"
                ?
                user.blocked ? userBlockButtonDisabled : userBlockButton
                :
                user.role.name === "Admin" ? setAdminButtonDisabled : setAdminButton
            }
            {popup}
        </div>
    );
}

UserButton.propTypes = {
    operation: PropTypes.string,
    user: PropTypes.object
};

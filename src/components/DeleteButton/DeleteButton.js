import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

export default function DeleteButton(props) {

    const classes = useStyles();
    const { collection, objectId } = props;

    const successAlert = () => {
        window.location.reload(false);
        console.log("Deleted")
    }

    const warningAlert = () => {
        console.log("Try Again")
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = () => {
        fetch('http://35.189.94.121/' + collection + '/' + objectId, {
            method: 'delete'
        }).then(response => {
            return response.json();
        }).then(responseData => {
            responseData.id ? successAlert() : warningAlert()
        })
    }

    const deleteButton = (
        <Tooltip
            id="tooltip-top"
            title="Delete"
            placement="top"
        >
            <IconButton size="small" aria-label="Delete" className={classes.tableActionButton} onClick={handleClickOpen}>
                <DeleteForeverIcon />
            </IconButton>
        </Tooltip>
    )
    const popup = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Delete the Bike?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You are deleting a bike object. This means you do not have this bike anymore.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: purple[500] }}>
                    CANCEL
                    </Button>
                <Button onClick={handleDelete} style={{ color: purple[500] }}>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <div >
            {deleteButton}
            {popup}
        </div>
    );
}

DeleteButton.propTypes = {
    collection: PropTypes.string,
    objectId: PropTypes.string
};

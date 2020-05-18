import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from '@material-ui/icons/Add';

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

export default function AddBikeButton(props) {

    const classes = useStyles();
    const { barcode, lastZoneName, isAvailable, zones } = props;

    const [zoneId, setZoneId] = useState(null);

    const successAlert = () => {
        window.location.reload(false);
        console.log("Added")
    }

    const warningAlert = () => {
        console.log("Try Again")
    }

    const [open, setOpen] = React.useState(false);
    const [barcodeOpen, setBarcodeOpen] = React.useState(false);
    const [zoneOpen, setZoneOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleBarcodeOpen = () => {
        setBarcodeOpen(true);
    };

    const handleZoneOpen = () => {
        setZoneOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setBarcodeOpen(false);
        setZoneOpen(false)
    };


    const checkFields = () => {
        if (!barcode) {
            handleBarcodeOpen()
            return false;
        }

        for (let i = 0; i < zones.length; i++) {
            if (zones[i].name === lastZoneName) {
                setZoneId(zones[i].id);
                return true;
            }
        }
        handleZoneOpen()
        return false;
    }


    const handleAdd = () => {

        if (!checkFields())
            return;

        handleClickOpen()
    }

    const createRequest = () => {
        fetch('http://35.189.94.121/bikes', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "barcode": barcode,
                "lastZoneId": zoneId,
                "isAvailable": isAvailable
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            responseData.id ? successAlert() : warningAlert()
        })
    }

    const AddBikeButton = (
        <Tooltip
            id="tooltip-top"
            title="Add"
            placement="top"
        >
            <IconButton size="small" aria-label="Add" className={classes.tableActionButton} onClick={handleAdd}>
                <AddIcon />
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
            <DialogTitle id="alert-dialog-slide-title">{"Add a New Bike?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You are creating a new bike object. This means you have a bike on the related zone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: purple[500] }}>
                    CANCEL
                    </Button>
                <Button onClick={createRequest} style={{ color: purple[500] }}>
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    )

    const barcodePopup = (
        <Dialog
            open={barcodeOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Invalid Barcode!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You must type a valid barcode.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: purple[500] }}>
                    OK
                    </Button>
            </DialogActions>
        </Dialog>
    )

    const zonePopup = (
        <Dialog
            open={zoneOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Invalid Zone!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    There is no such a zone name. You must type a valid zone name.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: purple[500] }}>
                    OK
                    </Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <div style={{ margin: "0 0 35px 0", }}>
            {AddBikeButton}
            {popup}
            {barcodePopup}
            {zonePopup}
        </div>
    );
}

AddBikeButton.propTypes = {
    barcode: PropTypes.string,
    lastZoneName: PropTypes.string,
    isAvailable: PropTypes.bool,
    zones: PropTypes.object
};

import React, { useState } from 'react';
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import styles from "assets/jss/material-dashboard-react/components/myTableStyle.js"

// colors
import { purple } from "@material-ui/core/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

export default function UpdateUserReports(props) {

    const { updatingReport } = props;

    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        status: updatingReport.status,
        adminComments: updatingReport.adminComments
    });

    const classes = useStyles();

    const successAlert = () => {
        window.location.reload(false);
        console.log("Added")
    }

    const warningAlert = () => {
        console.log("Try Again")
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const showStatusPopup = () => {
        setOpen(!open);
    }

    const checkStatus = () => {
        const status = values.status;
        if (status === "inProgress" || status === "created" || status === "done")
            return true;
        else {
            showStatusPopup()
            return false;
        }
    }

    const handleCloseClick = () => {
        window.location.reload(false);
    }

    const handleUpdate = () => {

        if (!checkStatus())
            return;

        fetch('http://35.189.94.121/reports/' + updatingReport.id, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "status": values.status,
                "adminComments": values.adminComments
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            responseData.id ? successAlert() : warningAlert()
        })
    }

    const statusPopup = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={showStatusPopup}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Invalid Status!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    There is no such a status. You must type one of created, inProgress or done.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MaterialButton onClick={showStatusPopup} style={{ color: purple[500] }}>
                    OK
                </MaterialButton>
            </DialogActions>
        </Dialog>
    )

    return (
        <div>


            <form>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            labelText="User Name"
                            id="user-name"
                            value={updatingReport.userName}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                disabled: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            labelText="Title"
                            id="title"
                            value={updatingReport.title}
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                disabled: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Description"
                            id="description"
                            value={updatingReport.description}
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea,
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                disabled: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={9}>
                        <CustomInput
                            labelText="Your Comments"
                            id="comments"
                            value={values.adminComments}
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea,
                                onChange: handleChange("adminComments")
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>

                        <CustomInput
                            labelText="status"
                            id="status"
                            value={values.status}
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea,
                                onChange: handleChange("status")
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3
                            }}
                        />

                    </GridItem>

                    <GridItem xs={12} sm={12} md={12} className={classes.textCenter}>
                        <Button
                            onClick={handleUpdate}
                            color="primary"
                        >
                            UPDATE
                        </Button >
                    </GridItem>
                </GridContainer>
            </form>

            {statusPopup}
        </div>
    );
}

UpdateUserReports.propTypes = {
    updatingReport: PropTypes.object
};

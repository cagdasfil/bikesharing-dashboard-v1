import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReportButton from "components/ReportButton/ReportButton.js"
import UpdateReport from "components/UpdateReport/UpdateReport.js"

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import Close from '@material-ui/icons/Close';
import styles from "assets/jss/material-dashboard-react/components/myTableStyle.js"

const useStyles = makeStyles(styles);

export default function Reports(props) {

    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [updatingReport, setUpdatingReport] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/reports', {
            method: 'get'
        }).then(response => {
            return response.json();
        }).then(reportsData => {
            setReports(reportsData)
        }).then(() => fetch('http://35.189.94.121/users', {
            method: 'get'
        })).then(response => {
            return response.json();
        }).then(usersData => {
            setUsers(usersData)
        }).then(() => {
            setLoading(false);
        })
    }, []);

    const handleUpdateClick = (report, userName) => (e) => {
        setUpdatingReport({ ...report, userName: userName });
        setUpdating(true);
    }

    const handleCancelClick = () => {
        setUpdatingReport(null);
        setUpdating(false);
    }


    const render = loading ? [["...Loading"]] : (
        reports.map(report => {
            const username = findUserName(report.userId);
            if (username.includes(props.searchValue) ||
                report.title.includes(props.searchValue) ||
                report.status.includes(props.searchValue)) {
                return [
                    username,
                    report.title,
                    report.status,
                    <ReportButton operation="details" report={report} />,
                    <ReportButton
                        operation="update"
                        report={report}
                        formControlProps={{
                            onClick: handleUpdateClick(report, username)
                        }}
                    />
                ]
            }
            else {
                return null
            }
        })
    )

    function findUserName(userId) {
        for (let i = 0; i < users.length; i++)
            if (users[i].id === userId)
                return users[i].name;
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Report Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[
                                    "User",
                                    "Title",
                                    "Status",
                                    "Details",
                                    "Update"
                                ]}
                                tableData={render}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

            {updating
                ? (
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card >
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>Update User Report

                                    <Tooltip
                                            id="tooltip-top"
                                            title="Close"
                                            placement="top"
                                        >
                                            <IconButton
                                                size="small"
                                                aria-label="Add"
                                                onClick={handleCancelClick}
                                                className={classes.cardTitleWhite}
                                                style={{ margin: '0 0 0 960px' }}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Tooltip>
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <UpdateReport updatingReport={updatingReport} />
                                </CardBody>

                            </Card>
                        </GridItem>
                    </GridContainer>
                )

                :
                null
            }

        </div>
    );
}

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

import styles from "assets/jss/material-dashboard-react/components/myTableStyle.js"

const useStyles = makeStyles(styles);

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/transactions', {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then(transactionsData => {
            setTransactions(transactionsData)
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

    const render = loading ? [["...Loading"]] : (
        transactions.map(transaction => {
            return [
                findUserName(transaction.userId),
                transaction.operationType,
                transaction.details.transactionAmount.toFixed(2)
            ]
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
                            <h4 className={classes.cardTitleWhite}>Transaction Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[
                                    "User",
                                    "Type",
                                    "Amount"
                                ]}
                                tableData={render}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

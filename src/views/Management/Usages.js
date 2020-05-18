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
import UsageButton from "components/UsageButton/UsageButton.js"
import styles from "assets/jss/material-dashboard-react/components/myTableStyle.js"

const useStyles = makeStyles(styles);

export default function Usages(props) {

    const [payments, setPayments] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [zones, setZones] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/payments', {
            method: 'get'
        }).then(response => {
            return response.json();
        }).then(paymentsData => {
            setPayments(paymentsData)
        }).then(() => fetch('http://35.189.94.121/transactions', {
            method: 'get'
        })).then(response => {
            return response.json();
        }).then(transactionsData => {
            setTransactions(transactionsData)
        }).then(() => fetch('http://35.189.94.121/users', {
            method: 'get'
        })).then(response => {
            return response.json();
        }).then(usersData => {
            setUsers(usersData)
        }).then(() => fetch('http://35.189.94.121/zones', {
            method: 'get'
        })).then(response => {
            return response.json();
        }).then(zonesData => {
            setZones(zonesData);
        }).then(() => fetch('http://35.189.94.121/bikes', {
            method: 'get'
        })).then(response => {
            return response.json();
        }).then(bikesData => {
            setBikes(bikesData);
        }).then(() => {
            setLoading(false);
        })
    }, []);

    const render = loading ? [["...Loading"]] : (
        payments.map(payment => {
            const usage = payment.usage;
            const usageTransactions = findTransactions(usage._id)
            const username = findUserName(usage.userId);
            const bikeBarcode = findBikeBarcode(usage.bikeId);
            const startZoneName = findZoneName(usage.startZoneId);
            const endZoneName = findZoneName(usage.endZoneId);
            if (username.includes(props.searchValue) ||
                bikeBarcode.includes(props.searchValue) ||
                startZoneName.includes(props.searchValue) ||
                endZoneName.includes(props.searchValue)) {
                return [
                    username,
                    bikeBarcode,
                    startZoneName,
                    endZoneName,
                    usage.createdAt,
                    usage.updatedAt,
                    payment.totalFee.toFixed(2),
                    (payment.totalFee - payment.totalPaid).toFixed(2),
                    <UsageButton
                        transactions={usageTransactions}
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
            if (users[i].id && users[i].id === userId)
                return users[i].name;
        return 'deleted!'
    }

    function findZoneName(zoneId) {
        for (let i = 0; i < zones.length; i++)
            if (zones[i].id && zones[i].id === zoneId)
                return zones[i].name;
        return 'deleted!'
    }

    function findBikeBarcode(bikeId) {
        for (let i = 0; i < bikes.length; i++)
            if (bikes[i].id && bikes[i].id === bikeId)
                return bikes[i].barcode;
        return 'deleted!'
    }

    function findTransactions(usageId) {
        console.log(usageId)
        let usageTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            let usage = transactions[i].details.usage;
            if (usage && usage._id === usageId)
                usageTransactions.push(transactions[i]);
        }
        return usageTransactions;
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Usage Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[
                                    "User",
                                    "Bike",
                                    "Start Zone",
                                    "End Zone",
                                    "Start Time",
                                    "End Time",
                                    "Total Fee",
                                    "Remained Debt",
                                    "Transactions"
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

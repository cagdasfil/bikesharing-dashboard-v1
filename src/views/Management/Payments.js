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

export default function Payments(props) {

    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/payments', {
            method: 'get'
        }).then(response => {
            return response.json();
        }).then(paymentsData => {
            setPayments(paymentsData)
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
        payments.map(payment => {
            const username = findUserName(payment.userId) || "";
            if(props.searchValue.includes("<")){
                const value = parseFloat(props.searchValue.substr(1));
                if(payment.totalFee < value){
                    return [
                        username,
                        payment.totalFee.toFixed(2),
                        (payment.totalFee - payment.totalPaid).toFixed(2)
                    ]
                }
                else{
                    return null;
                }
            }
            else if(props.searchValue.includes(">")){
                const value = parseFloat(props.searchValue.substr(1));
                if(payment.totalFee > value){
                    return [
                        username,
                        payment.totalFee.toFixed(2),
                        (payment.totalFee - payment.totalPaid).toFixed(2)
                    ]
                }
                else{
                    return null;
                }
            }
            else{
                if(username.includes(props.searchValue)){
                    return [
                        username,
                        payment.totalFee.toFixed(2),
                        (payment.totalFee - payment.totalPaid).toFixed(2)
                    ]
                }
                else{
                    return null
                }
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
                            <h4 className={classes.cardTitleWhite}>Payment Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[
                                    "User",
                                    "Total Fee",
                                    "Remaining Debt"
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

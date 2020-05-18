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

export default function Users(props) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/users', {
            method: 'get'
        })
            .then((response) => {
                return response.json();
            })
            .then(usersData => {
                setUsers(usersData)
            })
            .then(() => {
                setLoading(false);
            })
    }, []);

    const render = loading ? [["...Loading"]] : (
        users.map(user => {
            if(user.username.includes(props.searchValue) || 
                    user.email.includes(props.searchValue) ||
                    user.name.includes(props.searchValue) ||
                    user.surname.includes(props.searchValue) ||
                    user.role.name.includes(props.searchValue) ){
                return [
                    user.username,
                    user.email,
                    user.name,
                    user.surname,
                    user.role.name
                ]
            }
            else{
                return null
            }
        })
    )

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>User Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[
                                    "Username",
                                    "Email",
                                    "Name",
                                    "Surname",
                                    "Role"
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

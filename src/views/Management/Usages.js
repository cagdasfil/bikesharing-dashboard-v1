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

export default function Usages() {

    const [usages, setUsages] = useState([]);
    const [users, setUsers] = useState([]);
    const [zones, setZones] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/usages', {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then(usagesData => {
            setUsages(usagesData)
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
        usages.map(usage => {
            return [
                findUserName(usage.userId),
                findBikeBarcode(usage.bikeId),
                findZoneName(usage.startZoneId),
                findZoneName(usage.endZoneId),
                usage.createdAt,
                usage.updatedAt
            ]
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
                                    "End Time"
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

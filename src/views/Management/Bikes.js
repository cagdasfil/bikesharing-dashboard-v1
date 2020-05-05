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

export default function Bikes() {

    const [bikes, setBikes] = useState([]);
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/bikes', {
            method: 'get'
        }).then(response => {
            return response.json();
        }).then(bikesData => {
            setBikes(bikesData);
        }).then(() => fetch('http://35.189.94.121/zones', {
            method: 'get'
        })).then(response => {
            return response.json();
        }).then(zonesData => {
            setZones(zonesData);
        }).then(() => {
            setLoading(false);
        })
    }, []);

    const render = loading ? [["...Loading"]] : (
        bikes.map(bike => {
            return [
                bike.barcode,
                findZoneName(bike.lastZoneId),
                bike.isAvailable ? "true" : "false"
            ]
        })
    )

    function findZoneName(zoneId) {
        for (let i = 0; i < zones.length; i++)
            if (zones[i].id === zoneId)
                return zones[i].name;
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Bike Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[
                                    "Barcode",
                                    "Last Zone",
                                    "Available"
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

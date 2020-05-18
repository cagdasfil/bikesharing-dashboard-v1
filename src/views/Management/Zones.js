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

export default function Zones(props) {

    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        fetch('http://35.189.94.121/zones', {
            method: 'get'
        })
            .then((response) => {
                return response.json();
            })
            .then(zonesData => {
                setZones(zonesData)
            })
            .then(() => {
                setLoading(false);
            })
    }, []);

    const render = loading ? [["...Loading"]] : (
        zones.map(zone => {
            if(zone.name.includes(props.searchValue) ||
                    zone.address.includes(props.searchValue)){
                return [zone.name, zone.address];
            }
            else{
                return null;
            }
            
        })
    )

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card >
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Zone Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Name", "Address"]}
                                tableData={render}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

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
import CustomInput from "components/CustomInput/CustomInput.js";
import AddBikeButton from "components/AddBikeButton/AddBikeButton.js"
import SwitchButton from "components/SwitchButton/SwitchButton.js";
import DeleteButton from "components/DeleteButton/DeleteButton.js";

// icons
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

// font types
import Primary from "components/Typography/Primary.js";

// colors
import { purple } from "@material-ui/core/colors";

// style
import styles from "assets/jss/material-dashboard-react/components/myTableStyle.js";

const useStyles = makeStyles(styles);

export default function Bikes() {

    const [bikes, setBikes] = useState([]);
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSwitch, setSwitch] = React.useState(true);
    const [values, setValues] = React.useState({
        barcode: "",
        lastZoneName: ""
    });

    const handleSwitch = event => {
        setSwitch(!isSwitch);
    };

    const handleTypeInput = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

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
                <DeleteButton collection='bikes' objectId={bike.id} />,
                bike.barcode,
                findZoneName(bike.lastZoneId),
                bike.isAvailable
                    ?
                    <Primary>
                        <CheckIcon style={{ margin: '0 0 0 10px' }} />
                    </Primary>
                    :
                    <CloseIcon style={{ margin: '0 0 0 10px' }} />
            ]
        })
    )

    function findZoneName(zoneId) {
        for (let i = 0; i < zones.length; i++)
            if (zones[i].id === zoneId)
                return zones[i].name;
    }

    render.push(
        loading ? [] : [
            <AddBikeButton
                isAvailable={isSwitch}
                barcode={values.barcode}
                lastZoneName={values.lastZoneName}
                zones={zones}
            />,
            <CustomInput
                labelText="Barcode"
                id="barcode"
                value={values.barcode}
                formControlProps={{
                    fullWidth: true,
                    onChange: handleTypeInput("barcode")
                }}
            />,
            <CustomInput
                labelText="Last Zone"
                id="lastZone"
                value={values.lastZoneName}
                formControlProps={{
                    fullWidth: true,
                    onChange: handleTypeInput("lastZoneName")
                }}
            />,
            <SwitchButton
                label="Yes"
                color={purple}
                checked={isSwitch}
                formControlProps={{
                    onChange: handleSwitch
                }}
            />
        ]
    )

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
                                    "",
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

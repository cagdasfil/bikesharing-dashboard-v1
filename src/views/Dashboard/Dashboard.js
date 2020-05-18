// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js"
import React, { useState, useEffect } from 'react';
const useStyles = makeStyles(styles);
export default function Dashboard() {
    const classes = useStyles();
    const [usages, setUsages] = useState([]);
    useEffect(() => {
        fetch('http://35.189.94.121/usages', {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then(usagesData => {
            setUsages(usagesData)
            localStorage.setItem("usages",JSON.stringify(usagesData));
        })
    }, []);

    return (
        null
    );
}

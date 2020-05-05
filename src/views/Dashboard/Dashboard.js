import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js"

import ChartistGraph from "react-chartist";

import React, { useState, useEffect } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";




const useStyles = makeStyles(styles);
export default function Dashboard() {
    const classes = useStyles();

   
      

      var data = {
        series: [20, 15, 40],        
      };
      
      var sum = function(a, b) { return a + b };

      var opt = {
        labelInterpolationFnc: function(value) {
            return Math.round(value / data.series.reduce(sum) * 100) + '%';
        }
      };
      
      var responsiveOptions = [
        ['screen and (min-width: 640px)', {
          chartPadding: 30,
          labelOffset: 100,
          labelDirection: 'explode',
          labelInterpolationFnc: function(value) {
            return value;
          }
        }],
        ['screen and (min-width: 1024px)', {
          labelOffset: 80,
          chartPadding: 20
        }]
      ];

      

    return (

        
        <div >
        <ChartistGraph data={{
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        series: [
          [1000, 925, 650, 845, 800, 785, 475]
        ]
      }}s options={{
        axisY: {
          },
        fullWidth: true,
        chartPadding: {
          right: 200
      }}} type={'Line'} />

        <ChartistGraph data={{labels: ["7.00", "8.00", "9.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00"],
  series: [
    [Math.random() * 50,Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50, Math.random() * 50,  Math.random() * 50 ]
  ]}} options={{
    fullWidth: true,
    showArea: true,
    chartPadding: {
        right: 250
    }
  }}  type={'Line'} />



        <ChartistGraph data={data} options={opt} responseOptions={responsiveOptions} type={'Pie'} />
        </div>
    );
}

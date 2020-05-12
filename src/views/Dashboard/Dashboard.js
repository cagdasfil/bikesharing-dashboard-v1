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
import { whiteColor } from "assets/jss/material-dashboard-react";




const useStyles = makeStyles(styles);
export default function Dashboard() {
    const classes = useStyles();

    var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYmFiNDI0YmFlOTdjMDAwYWQ3ZGUxZSIsImlhdCI6MTU4OTI5NTA3MSwiZXhwIjoxNTkxODg3MDcxfQ.ewD-cgShIivly15w3ITo55QpDAlW92lEDW5e_aN1YtE";
    
    const [Mon, setMon] = useState(0);
    const [Tue, setTue] = useState(0);
    const [Wed, setWed] = useState(0);
    const [Thu, setThu] = useState(0);
    const [Fri, setFri] = useState(0);
    const [Sat, setSat] = useState(0);
    const [Sun, setSun] = useState(0);
    const [Hours, setHours] = useState([]);



    let mon = 0;
    let tue = 0;
    let wed = 0;
    let thu = 0;
    let fri = 0;
    let sat = 0;
    let sun = 0;

    let hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      

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

      function days(response){
        response.forEach(element => {
          var date = new Date(element.createdAt);
          if (date.getDay()===1) {
            mon=mon+1;;
          } else if (date.getDay()===2) {
            tue=tue+1;
          } else if (date.getDay()===3) {
            wed=wed+1;
          } else if (date.getDay()===4) {
            thu=thu+1;
          } else if (date.getDay()===5) {
            fri=fri+1;
          } else if (date.getDay()===6) {
            sat=sat+1;
          } else if (date.getDay()===0) {
            sun=sun+1;
          }

          hours[date.getHours()] = hours[date.getHours()] + 1 ;

          


          console.log("Dogan",hours);
          console.log("Sogan",Mon);
        })
        setMon(mon);
        setTue(tue);
        setWed(wed);
        setThu(thu);
        setFri(fri);
        setSat(sat);
        setSun(sun);
        setHours(hours);
      }      

      useEffect(() => {
        fetch('https://bikesharing-261122.appspot.com/auth/local/', {
          method : 'post',
          headers : {'Content-Type':'application/json'},
          body : JSON.stringify({
            "identifier" : "Dogan",
            "password" : "123456"
          }),
        }).then((response) => {
          return response.json();
      }).then((response) => 
        fetch('https://bikesharing-261122.appspot.com/usages', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:  'Bearer ' + response.jwt,
            },
        })).then((response) => {
          return response.json();
        }).then((response) => {
          days(response);
        })

            
    }, []);


   

      

    return (
      <div >
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Daily Usage Graph</h2>
          <h5 className={classes.description}>

          </h5>
        </GridItem>
        <ChartistGraph data={{
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          series: [[Sun, Mon, Tue, Wed, Thu, Fri, Sat]]}}
          s 
          options={{
            low: 0,
            high: 500,
            width: '800px',
            height: '500px',
            axisY: {
              },
            fullWidth: true,
            chartPadding: {
              right: 200
              }
            }
          } 
          type={'Line'} />
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Hourly Usage Graph</h2>
          <h5 className={classes.description}>

          </h5>
        </GridItem>
        <ChartistGraph data={{
          labels: ["00.00", "1.00", "2.00", "3.00", "4.00", "5.00","6.00","7.00", "8.00", "9.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00"],
          series: [Hours]}} 
          options={{
            low: 0,
            high: 50,
            width: '1000px',
            height: '400px',
          fullWidth: true,
          showArea: true,
          }}  
          type={'Line'} />
        <ChartistGraph data={data} options={opt} responseOptions={responsiveOptions} type={'Pie'} />     
      </div>
    );
}

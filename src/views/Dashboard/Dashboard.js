import React, { useState, useEffect } from 'react';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";




import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);



export default function Dashboard() {
    const classes = useStyles();

    const [Mon, setMon] = useState(0);
    const [Tue, setTue] = useState(0);
    const [Wed, setWed] = useState(0);
    const [Thu, setThu] = useState(0);
    const [Fri, setFri] = useState(0);
    const [Sat, setSat] = useState(0);
    const [Sun, setSun] = useState(0);
    const [Hours, setHours] = useState([]);
    const [Startzone, setStartzone] = useState([]);
    const [Endzone, setEndzone] = useState([]);
    const [StartZoneName, setStartZoneName] = useState([]);
    const [EndZoneName, setEndZoneName] = useState([]);
    const [sname, setN] = useState("")



    let mon = 0;
    let tue = 0;
    let wed = 0;
    let thu = 0;
    let fri = 0;
    let sat = 0;
    let sun = 0;


    let hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var startZoneCounter = [];
    var endZoneCounter = [];
    var startName = [];
    var endName = ["dg"];
    let startId = [];
    let endId = [];



    function days(response) {
        var MondayList = [];
        var TuesdayList = [];
        var WednesdayList = [];
        var ThursdayList = [];
        var FridayList = [];
        var SaturdayList = [];
        var SundayList = [];
        let monOrt = 0;
        let tueOrt = 0;
        let wedOrt = 0;
        let thuOrt = 0;
        let friOrt = 0;
        let satOrt = 0;
        let sunOrt = 0;
        var S = [];
        var E = [];
        response.forEach(element => {
            var date = new Date(element.createdAt);
            if (date.getDay() === 1) {
                mon = mon + 1;
                if (!MondayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    MondayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                }
                monOrt = mon / (MondayList.length) //Getting average
            } else if (date.getDay() === 2) {
                tue = tue + 1;
                if (!TuesdayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    TuesdayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                }
                tueOrt = tue / TuesdayList.length; //Getting average
            } else if (date.getDay() === 3) {
                wed = wed + 1;
                if (!WednesdayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    WednesdayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                }
                wedOrt = wed / WednesdayList.length; //Getting average
            } else if (date.getDay() === 4) {
                thu = thu + 1;
                if (!ThursdayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    ThursdayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                }
                thuOrt = thu / ThursdayList.length; //Getting average
            } else if (date.getDay() === 5) {
                fri = fri + 1;
                if (!FridayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    FridayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                    friOrt = fri / FridayList.length; //Getting average
                }
                friOrt = fri / FridayList.length; //Getting average
            } else if (date.getDay() === 6) {
                sat = sat + 1;
                if (!SaturdayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    SaturdayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                    satOrt = sat / SaturdayList.length; //Getting average
                }
                satOrt = sat / SaturdayList.length; //Getting average
            } else if (date.getDay() === 0) {
                sun = sun + 1;
                if (!SundayList.includes(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())) {
                    SundayList.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
                }
                sunOrt = sun / SundayList.length; //Getting average
            }

            hours[date.getHours()] = hours[date.getHours()] + 1;


            var start_id = element.startZoneId;
            var end_id = element.endZoneId;

            if (startId.includes(start_id)) {
                startZoneCounter[startId.indexOf(start_id)] = startZoneCounter[startId.indexOf(start_id)] + 1;
            }
            else {
                startId.push(start_id);
                startZoneCounter.push(1);
            }

            if (endId.includes(end_id)) {
                endZoneCounter[endId.indexOf(end_id)] = endZoneCounter[endId.indexOf(end_id)] + 1;
            }
            else {
                endId.push(end_id);
                endZoneCounter.push(1);
            }




        })

        hours.forEach(element => {
            element = element / (MondayList.length + TuesdayList.length + WednesdayList.length + ThursdayList.length + FridayList.length + SaturdayList.length + SundayList.length)
        });

        getStartZone();


        getEndZone();




        setMon(monOrt);
        setTue(tueOrt);
        setWed(wedOrt);
        setThu(thuOrt);
        setFri(friOrt);
        setSat(satOrt);
        setSun(sunOrt);
        setHours(hours);
        setStartzone(startZoneCounter);

        setEndzone(endZoneCounter);
        setEndZoneName(endName);




    }

    function s_zone(response) {
        var start = [];
        startId.forEach(element1 => {
            response.forEach(element2 => {
                if (element1 == element2.id) {
                    start.push(element2.name);
                }
            });
        });

        setStartZoneName(start);


    }

    function e_zone(response) {
        var end = [];
        startId.forEach(element1 => {
            response.forEach(element2 => {
                if (element1 == element2.id) {
                    end.push(element2.name);
                }
            });
        });

        setEndZoneName(end);


    }

    function getStartZone() {
        fetch('https://bikesharing-261122.appspot.com/zones/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jwt,
            },
        }).then((response) => {
            return response.json();
        }).then((response) => {
            s_zone(response);
        });
    }

    function getEndZone() {
        fetch('https://bikesharing-261122.appspot.com/zones/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jwt,
            },
        }).then((response) => {
            return response.json();
        }).then((response) => {
            e_zone(response);
        });
    }

    var jwt;

    useEffect(() => {
        fetch('https://bikesharing-261122.appspot.com/auth/local/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "identifier": "Dogan",
                "password": "123456"
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            jwt = response.jwt;
        }).then(() =>
            fetch('https://bikesharing-261122.appspot.com/usages', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt,
                },
            })).then((response) => {
                return response.json();
            }).then((response) => {
                days(response);
            })


    }, []);

    function lastUpdate() {
        let date = new Date();
        let day = date.getDay();
        if (day == 0) {
            return ("today");
        }
        else if (day == 1) {
            return ("yesterday");
        }
        else {
            return (date.getDay() + "days ago")
        }
    }

    function maxIn() {
        return Hours.indexOf(Math.max.apply(Math, Hours));
    }

    function maxDay() {
        var days = [Mon, Tue, Wed, Thu, Fri, Sat, Sun];
        var weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var maksimum = Math.max(Mon, Tue, Wed, Thu, Fri, Sat, Sun);
        return weekday[days.indexOf(maksimum)];
    }

    function maxZone(labels, series) {
        return labels[series.indexOf(Math.max.apply(Math, series))];
    }


    return (
        <div>

            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                                    series: [[Mon, Tue, Wed, Thu, Fri, Sat, Sun]]
                                }}
                                type="Line"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Daily Usage Average</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.successText}>
                                    {maxDay()}
                                </span>{" "}
                is the most preferred day.
              </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated {lastUpdate()}
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: [
                                        "0", "1", "2",
                                        "3", "4", "5",
                                        "6", "7", "8",
                                        "9", "10", "11",
                                        "12", "13", "14",
                                        "15", "16", "17",
                                        "18", "19", "20",
                                        "21", "22", "23"
                                    ],
                                    series: [Hours]
                                }}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Hourly Usage Average</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.dangerText}>
                                    {maxIn()}.00
                </span>{" "}
                is the peak hour </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated today
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: StartZoneName,
                                    series: [Startzone]
                                }}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Start Station</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.zoneText}>
                                    {maxZone(StartZoneName, Startzone)}
                                </span>{" "}
                is the region where the most bikes are taken. </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated today
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: EndZoneName,
                                    series: [Endzone]
                                }}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>End Station</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.zoneText}>
                                    {maxZone(EndZoneName, Endzone)}
                                </span>{" "}
                is the region where the most bikes are droped. </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated today
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

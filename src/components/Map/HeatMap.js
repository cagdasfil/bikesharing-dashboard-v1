/* global google */
/* eslint-disable no-undef */
import React, { PureComponent } from 'react';
import mapboxgl from 'mapbox-gl';
import "assets/css/mapbox.css"
import PubNub from 'pubnub';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const filters = [
    {
        value: 'real',
        label: 'Real-time',
    },
    {
        value: 'daily',
        label: 'Daily',
    },
    {
        value: 'weekly',
        label: 'Weekly',
    },
    {
        value: 'monthly',
        label: 'Monthly',
    },
];
class HeatMap extends PureComponent {
    constructor(props) {
        super(props);
        this.pubnub = new PubNub({
            publishKey: this.props.publish,
            subscribeKey: this.props.subscribe
        });
        this.state = {
            lat: 38.497455,
            lng: 27.113452,
            zoom: 15,
            heatMapPoints: {
                type: "FeatureCollection",
                features: []
            },
            dailyPoints: {
                type: "FeatureCollection",
                features: []
            },
            weeklyPoints: {
                type: "FeatureCollection",
                features: []
            },
            monthlyPoints: {
                type: "FeatureCollection",
                features: []
            },
            filter: "real",
        }
        mapboxgl.accessToken = this.props.mapbox;

    }
    handleChange = (event) => {
        this.setState({ filter: event.target.value })
    };

    async componentWillMount() {
        let usages = null;
        usages = localStorage.getItem("usages");
        usages = JSON.parse(usages);
        if (usages === "null" || usages === null) {

        }
        else {
            let dailyPoints = {
                type: "FeatureCollection",
                features: []
            }
            let weeklyPoints = {
                type: "FeatureCollection",
                features: []
            }
            let monthlyPoints = {
                type: "FeatureCollection",
                features: []
            }
            const currentDate = new Date();
            usages.map(usage => {
                var usageDate = new Date(usage.createdAt);
                if (usageDate.getDate() != currentDate.getDate()) {

                }
                else if (usageDate.getMonth() != currentDate.getMonth()) {

                }
                else if (usageDate.getFullYear() != currentDate.getFullYear()) {

                }
                else {
                    console.log(usage.coords)
                    usage.coords.map(point => {

                        let feature = {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: point
                            }
                        };
                        dailyPoints.features.push(feature);

                    })
                }
                var diffDays = Math.ceil((currentDate - usageDate) / (1000 * 60 * 60 * 24))
                if (diffDays <= 7) {
                    usage.coords.map(point => {
                        let feature = {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: point
                            }
                        };
                        weeklyPoints.features.push(feature);
                    })

                }
                if (diffDays <= 30) {
                    usage.coords.map(point => {
                        let feature = {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: point
                            }
                        };
                        monthlyPoints.features.push(feature);
                    })
                }

            })
            this.setState({ dailyPoints: dailyPoints });
            this.setState({ weeklyPoints: weeklyPoints });
            this.setState({ monthlyPoints: monthlyPoints });
        }

        this.pubnub.subscribe({
            channels: ["gpstrack"],
        })

        const self = this;
        this.pubnub.addListener({
            message: function (msg) {
                localStorage.setItem("message", JSON.stringify(msg.message.coords))
                let feature = {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: msg.message.coords
                    }
                };
                self.setState({
                    heatMapPoints: {
                        ...self.state.heatMapPoints,
                        features: [
                            ...self.state.heatMapPoints.features,
                            feature
                        ]
                    }
                })
            },
        })
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom
        });

        this.map.on("load", () => {
            this.map.addSource("point", {
                type: "geojson",
                data: this.state.heatMapPoints,
                buffer: 0
            });

            this.map.addLayer({
                id: "taxi",
                type: "heatmap",
                source: "point",
                paint: {
                    "heatmap-intensity": {
                        stops: [[5, 1], [7, 3]]
                    },
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0,
                        "rgba(33,102,172,0)",
                        0.2,
                        "rgb(103,169,207)",
                        0.4,
                        "rgb(209,229,240)",
                        0.6,
                        "rgb(253,219,199)",
                        0.8,
                        "rgb(239,138,98)",
                        1,
                        "rgb(178,24,43)"],
                    "heatmap-radius": {
                        stops: [[5, 2], [7, 20]]
                    },
                    "heatmap-opacity": {
                        default: 1,
                        stops: [[5, 1], [10, 0.5]]
                    }
                }
            });
        })
    }
    componentDidUpdate() {
        if (this.state.filter === "real") {
            this.map.getSource("point").setData(this.state.heatMapPoints);
        }
        else if (this.state.filter === "daily") {
            this.map.getSource("point").setData(this.state.dailyPoints);
        }
        else if (this.state.filter === "weekly") {
            this.map.getSource("point").setData(this.state.weeklyPoints);
        }
        else {
            this.map.getSource("point").setData(this.state.monthlyPoints);
        }


    }
    render() {
        return (



            <div>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={this.state.filter}
                    onChange={this.handleChange}
                    helperText="You can change heatmap option"
                >
                    {filters.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div ref={el => { this.mapContainer = el }} style={{ position: 'absolute', height: "75%", width: "75%" }} />
            </div>
        );
    }
}
export default HeatMap;
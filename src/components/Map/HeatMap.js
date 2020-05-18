/* global google */
/* eslint-disable no-undef */
import React,{PureComponent} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { func } from 'prop-types';
import "./mapbox.css"
import PubNub from 'pubnub';

class HeatMap extends PureComponent {
    constructor(props){
        super(props);
        this.pubnub = new PubNub({
            publishKey:this.props.publish,
            subscribeKey:this.props.subscribe
        });
        this.state={
            lat:38.497455,
            lng:27.113452,
            zoom:15,
            heatMapPoints:{
                type: "FeatureCollection",
                features:[]
            }
        }
        mapboxgl.accessToken = this.props.mapbox;
       
    }
    componentWillMount(){
        this.pubnub.subscribe({
            channels:["gpstrack"],
        })  
        
        const self = this;
        this.pubnub.addListener({
            message: function(msg) {
                localStorage.setItem("message",JSON.stringify(msg.message.coords))
                let feature = {
                    type:"Feature",
                    properties:{},
                    geometry:{
                        type:"Point",
                        coordinates: msg.message.coords
                    }
                };
                self.setState({
                    heatMapPoints:{
                        ...self.state.heatMapPoints,
                        features:[
                            ...self.state.heatMapPoints.features,
                            feature
                        ]
                    }
                })   
            },      
        })
    }
    componentDidMount(){
        const {lng,lat,zoom} = this.state;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom
            });

        this.map.on("load",()=>{
            this.map.addSource("point",{
                type:"geojson",
                data:this.state.heatMapPoints,
                buffer:0
            });
        
        this.map.addLayer({
            id:"taxi",
            type:"heatmap",
            source:"point",
            paint:{
                "heatmap-intensity":{
                    stops:[[5,1],[7,3]]
                },
                "heatmap-color":[
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
                "heatmap-radius":{
                    stops:[[5,2],[7,20]]
                },
                "heatmap-opacity":{
                    default:1,
                    stops:[[5,1],[10,0.5]]
                }
            }
        });
    })
    }
    componentDidUpdate(){
        this.map.getSource("point").setData(this.state.heatMapPoints);
    }
    render() {
        return (
           <div>
               <div ref={el => {this.mapContainer = el}} style={{position:'absolute',height:"75%",width:"75%"}} />
           </div>   
        );
    }
}
export default HeatMap;
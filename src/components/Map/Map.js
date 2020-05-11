import React from 'react';
import GoogleMapReact from 'google-map-react';
import {points} from '../../assets/points.js'

const gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
  var mainStyle = {
    width: '75%',
    height: '75%',
    left: 0,
    top: 0,
    margin: '10%',
    padding: 0,
    position: 'absolute'
  };

export default class Map extends React.Component {

    render() {
        

        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA8yhD20RKHZrL2cDGOJXRVK_nm-Nb5ykE"}}
                zoom={14}
                style={mainStyle}
                center={{ lat: 39.895001, lng: 32.777934 }}
                options={{
                        scrollwheel:false,
                        gestureHandling:"cooperative",
                        panControl: false,
                        mapTypeControl: false, 
                        styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]}}
                heatmapLibrary={true}
                heatmap ={points}
            >
               
            </GoogleMapReact>
           
        );
    }
}

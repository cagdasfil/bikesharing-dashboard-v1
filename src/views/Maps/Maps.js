import React,{Component} from 'react';
import Map from "../../components/Map/Map.js"
import HeatMap from '../../components/Map/HeatMap.js';
const pubkey = "pub-c-e931fca2-2897-4f6c-a318-247ab6b7fd49";
const subkey = "sub-c-79fca6d4-9613-11ea-9e4d-221e1ff586d3";

const channel = 'gpstrack';
const mapboxToken='pk.eyJ1IjoiYWthZGlya2lsYXZ1eiIsImEiOiJja2E3YThrMjUwMTgyMndxd2Examw4aHR0In0.bHwGF7fK-h8JjXhS7wLT-Q';


class Maps extends Component{
    render(){
        return(
            <HeatMap publish={pubkey} subscribe={subkey} channel={channel} mapbox={mapboxToken} />
        );
    }
}
export default Maps;
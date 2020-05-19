import React, { useState } from "react";
import { Icon, LatLng } from "leaflet";
import { Button, Form } from "react-bootstrap";
//import { Container, Row, Col } from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import Draw from 'leaflet-draw';
import "./map.css"
import L from 'leaflet';
//import $ from 'jquery';
//window.$ = $;

import Zones from "./Zones_table";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


console.log("WINDOW", window)



    
export default class Mapping extends React.Component{


  constructor(props){
    super(props);
    this.state={
      rowsPerPage:10,
      zone:[],
      gotData: false,
      geojsonLayer: [],
      zoneName:"",
      zoneAddres:"",
      newZone: [],
      name: "",
      address: "",
      names:[],
      addresses:[],
      ids:[],
      dataBaseZones:[],
      newDataBaseZones:[],
      indexOf:[],
      delete: false,
      isUpdate: false,
      updateCoordinates: [],
      jwt: localStorage.jwt,
    };

    this.handleZoneData = this.handleZoneData.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({zoneName: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.coord);
    event.preventDefault();
  }


  handleZoneData = (data) => {
    let dgn = [];
    this.setState({dataBaseZones: []});
    for(var i in data){
      dgn.push([data[i]]);
      this.state.dataBaseZones.push({name: data[i].name,
                                    address: data[i].address,
                                    id: data[i].id,
                                    coordinates: data[i].polygon.geometry.coordinates[0],
                                    leaflet_id:""
                                  });
    }
    
    this.setState({zone: dgn});
    
    this.setState({gotData: false});

  };

  getData(){
    fetch('http://35.189.94.121/zones', {
      method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:  'Bearer ' + this.state.jwt,
          },
        

    }).then((response) => {
            return response.json();
        })
        .then((data) => {
          this.handleZoneData(data);
    });
  }


  postData(coord){
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({ name: this.state.name, address: this.state.address, coordinates: [coord]})
    };
    console.log('deneme', requestOptions.body)
    fetch('http://35.189.94.121/zones/insertZone', requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }


  UpdateZone(id, coord){
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({ zoneId: id, newCoordinates: [coord]})
    };
    fetch('http://35.189.94.121/zones/updatePolygon', requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }
 


  componentDidMount() {
    this.getData();
    const map = this.leafletMap.leafletElement;
    var drawnItems = new L.FeatureGroup();
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    //map.on('click', onMapClick);
    
    
    map.addLayer(drawnItems);

    

    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: true,
        polygon: true,
        circle: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);
    map.on('mouseover', (e) => {
      if(!this.state.gotData){
        for(var i = 0 ; i< this.state.zone.length ; i++) {
          var geojsonLayer = L.geoJson(this.state.zone[i][0].polygon);
          this.state.dataBaseZones[i].leaflet_id = geojsonLayer._leaflet_id-1;
          geojsonLayer.getLayers()[0].addTo(drawnItems);
          
        }
        this.setState({newDataBaseZones: this.state.dataBaseZones});
        this.setState({gotData: true});  
      }
      });

    

    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;      
      console.log('LAYER ADDED:', layer)

      
      if (layer.getRadius) {
        console.log('It\'s a circle');
      }

      
      drawnItems.addLayer(layer);
      
      var allLayer = drawnItems.toGeoJSON().features;
      var LatLng = [];
      var zones = [];
      for (let i = this.state.dataBaseZones.length; i < allLayer.length; i++) {
        var LatLng = [];
        if(allLayer[i].geometry.coordinates[0].length >= 3){
          for (let j = 0; j < allLayer[i].geometry.coordinates[0].length; j++) {
            LatLng.push([allLayer[i].geometry.coordinates[0][j][1], allLayer[i].geometry.coordinates[0][j][0]]);           
          }

          zones.push({coordinates: LatLng});
          
        }
      }

      this.setState({newZone: zones});

    });

    map.on(L.Draw.Event.EDITED, (e) => {
      const layers = e.layers;
      let countOfEditedLayers = 0;
      console.log('LAYER EDITED:', layers)
      layers.eachLayer((layer) => {
        countOfEditedLayers++;
      });

      var index = [];
      for (let i = 0; i < this.state.dataBaseZones.length; i++) {
        if (e.layers._layers[this.state.dataBaseZones[i].leaflet_id]) {
          index.push(i);
          var temp = [];
          var latlngs = e.layers._layers[this.state.dataBaseZones[i].leaflet_id]._latlngs[0];
          for (let j = 0; j < latlngs.length; j++) {
            temp.push([latlngs[j].lng, latlngs[j].lat]);            
          }
          temp.push([latlngs[0].lng, latlngs[0].lat]);  
          console.log('ID-1', this.state.dataBaseZones[i].coordinates)
          this.state.dataBaseZones[i].coordinates = temp;
          this.UpdateZone(this.state.dataBaseZones[i].id, this.state.dataBaseZones[i].coordinates);
          console.log('ID-2', temp)
        }
        
      }

      this.setState({indexOf: index})  
    });

    map.on(L.Draw.Event.DELETED, (e) => {
      console.log('DELETED', e)
      this.setState({delete: true})    
    });   
  }

  ters(array){
    var newArray = array;
    for (let i = 0; i < array.length; i++) {
      newArray[i].reverse();
      
    }
    return newArray;
  }
  
  deleteClick(id){
    fetch('http://35.189.94.121/zones/' + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    for (let i = 0; i < this.state.dataBaseZones.length; i++) {
      if(this.state.dataBaseZones[i].id === id){
        this.state.dataBaseZones.splice(i, 1);
      }
    }
  }

  updateNameAndAddress(idx, coord){
    var temp = [];
    temp.push({id: idx, coordinates: coord});
    this.setState({updateCoordinates: temp, isUpdate:true});
  }



  update(id, coord){
    const requestOptions = {
      method: 'PUT',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({name: this.state.name, address: this.state.address})
    };
    fetch('http://35.189.94.121/zones/' + id, requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    
    for (let i = 0; i < this.state.newDataBaseZones.length; i++) {
      if(this.state.newDataBaseZones[i].id === id){
        this.state.newDataBaseZones[i].name = this.state.name;
        this.state.newDataBaseZones[i].address = this.state.address;
      }
    }

    this.setState({isUpdate:false});
    
  }

  handleClick(e) {
    console.log('n2',e);   
  }

  render() {
    return (
      <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Zones />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
                <Map
                ref={m => { this.leafletMap = m; }}
                center={[39.8909236,32.7777734]} zoom={15}
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {this.state.newDataBaseZones.map(({name, address, id, coordinates}) => (
                    <Polygon
                    
                    positions={this.ters(coordinates)}


                    color='#3E2723'
                    onClick={this.handleClick}
                    >
                    {!this.state.isUpdate?
                    <Popup >
                        <div className="Name">
                        <form  >
                            <div >
                            <div className="Setting">
                                <Form.Label className="FormLabels">{name}</Form.Label>
                            </div>
                            
                            <div className="Setting">
                                <Form.Label className="FormLabels">{address}</Form.Label>
                            </div>
                            <button className ="SetMargin" type="button" onClick={() => this.updateNameAndAddress(id, coordinates)}>Update Zone</button>
                            <button className ="SetMargin" type="submit" onClick={() => this.deleteClick(id)}>Delete Zone</button>
                                            
                            </div>                   
                        </form>
                        </div>
                    </Popup>
                    :
                    <Popup >
                        <div className="Name">
                        <form  >
                            <div >
                            <div className="Setting">
                                <Form.Label className="FormLabels">Name: </Form.Label>
                                <Form.Control className="FormBoxes"
                                autoFocus
                                onChange={e => this.setState({name : e.target.value})}
                                />
                            </div>
                            
                            <div className="Setting">
                                <Form.Label className="FormLabels">Address: </Form.Label>
                                <Form.Control className="FormBoxes2"
                                onChange={e => this.setState({address : e.target.value})}
                                />
                            </div>
                            <button className ="SetMargin" type="button" onClick={() => this.update(id, coordinates)}>Update Zone</button>
                                            
                            </div>                   
                        </form>
                        </div>
                    </Popup>
                    }
                    </Polygon>
                ))}
                
                {this.state.newZone.map(({name, address, coordinates }) => (
                    <Polygon
                    
                    positions={coordinates}


                    color='#000099'
                    onClick={this.handleClick}
                    >
                    <Popup>
                        <div className="Form">
                        <form  >
                            <div >
                            <div className="Setting">
                                <Form.Label className="FormLabels">Name: </Form.Label>
                                <Form.Control className="FormBoxes"
                                autoFocus
                                onChange={e => this.setState({name : e.target.value})}
                                />
                            </div>
                            
                            <div className="Setting">
                                <Form.Label className="FormLabels">Address: </Form.Label>
                                <Form.Control className="FormBoxes2"
                                onChange={e => this.setState({address : e.target.value})}
                                />
                            </div>
                            <button className ="SetMargin" type="submit" onClick={() => this.postData(this.ters(coordinates))}>Insert Zone</button>
                                            
                            </div>                   
                        </form>
                        </div>
                    </Popup>
                    </Polygon>
                ))}
                </Map>
            </GridItem>
        </GridContainer>
        

      </div>
      
    );
  }
}

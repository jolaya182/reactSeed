import React,  {Component} from 'react';
import pages from '../../build/pages.scss';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiamF2aTE4MiIsImEiOiJjamYybWk0ejIwNDU3MndwNGI3N3dpZDhrIn0.0E-FWZ5_UhVfyAftHh3eIA';
    

export default class MapComp extends Component{
  constructor(props){
    super(props);
    this.state = {
      lng:-73.960,
      lat:15,
      zoom: 13
    }
  }
  componentDidMount(){
    const {lng, lat, zoom} = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', ()=>{
      const {lng, lat} = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }
  render(){
    const {lng, lat, zoom} = this.state;

    return (
      <div>
        <div className="nline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold"> 
          <div> {`Longitude: ${lng} Latitude: ${lat}  Zoom: ${zoom}`}
          </div> 
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" ></div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
let map, marker;
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1Ijoic3BsZWVreiIsImEiOiJja203bTQ3bW8wNTl1MnBwaGliNTFpb3BtIn0.6MA8A7LX1miJ2Wtop3YyDQ';
class mapContainer extends Component {
  componentDidMount() {
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.coordinates.lon, this.props.coordinates.lat],
      zoom: 10
    });
    map.boxZoom.enable();
    map.dragRotate.disable();
    marker = new mapboxgl.Marker({
      color: '#fd4801',
    }).setLngLat([this.props.coordinates.lon, this.props.coordinates.lat]).addTo(map);
  }
  componentDidUpdate() {
    map.jumpTo({
      center: [this.props.coordinates.lon, this.props.coordinates.lat],
      zoom: 10
    })
    marker.setLngLat([this.props.coordinates.lon, this.props.coordinates.lat])
  }
  render() {
    return (
      <div className = 'map_container'>
        <Map {...this.props} />
        <div className="coordinates">
        <div className="coordinates__item">Широта: {this.props.coordinates.lat}°</div>
        <div className="coordinates__item">Долгота: {this.props.coordinates.lon}°</div>
      </div>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    coordinates: state.weatherData.location.coordinates,
  }
}

export default connect(mapStateToProps)(mapContainer);

import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const LocationComponent = ({ text }) => <div>{text}</div>;

const GeoMap = ({data}) => {
    const mapOptions = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 1
    }

    const returnLocationComponents = data.length ? data.map((x) => <LocationComponent lat={x.lat} lng={x.lon} text={x.name}/>) : []

    return(
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBzw9RZqRjpNacNglEUVHOT67Wttu-yxtM'}}
          defaultCenter={mapOptions.center}
          defaultZoom={mapOptions.zoom}
        >
          {returnLocationComponents}
        </GoogleMapReact>
    )
}

export default GeoMap;
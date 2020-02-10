import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const LocationComponent = ({ text }) => <div>{text}</div>;

const GeoMap = ({data, lat, long}) => {
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      if(lat && long){
        setLoading(false)
      }
    }, [lat, long])
    const mapOptions = {
        center: {
            lat: lat,
            lng: long
        },
        zoom: 8
    }

    const returnLocationComponents = data.length ? data.map((x) => <LocationComponent lat={x.lat} lng={x.lon} text={x.name}/>) : []

    return (
      <>
        {loading ?
          <div className="loader"></div>
        :
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GMAPKEY}}
            defaultCenter={mapOptions.center}
            defaultZoom={mapOptions.zoom}
          >
            {returnLocationComponents}
          </GoogleMapReact>
        }
      </>
    )
}

export default GeoMap;
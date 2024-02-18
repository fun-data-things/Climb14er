import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function MapComponent( {latitude, longitude, style} ) {  
  const center = {
    lat: Number(latitude),
    lng: Number(longitude)
  };
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={style}
        mapTypeId={'terrain'}
        zoom={10}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {
          <Marker position={center} />
        }
      </GoogleMap>
    ) : <></>
  }

export default MapComponent
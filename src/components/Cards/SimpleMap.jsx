import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const  SimpleMap = ({latitude, longitude, name}) => {
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 11
  };

  return (
    <div style={{ height: '300px', width: '300px' }}>
      <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
            lat={latitude}
            lng={longitude}
            text={name}
        />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
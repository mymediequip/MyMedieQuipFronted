import React, { useEffect, useState } from 'react'
const MapView = ({lat ,long}) => {
    const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
      setCurrentLocation({ lat: lat, lng: long });
  }, [lat ,long]);

  // Ensure that currentLocation exists before rendering the map
  if (!currentLocation) {
    return <div>Loading...</div>;
  }
  return (
    //    <LoadScript googleMapsApiKey="AIzaSyADGoHCfvvOG_3Ym3WxRD-yg4-3-KvR8xA">
    //    <GoogleMap
    //      center={currentLocation}
    //      zoom={13}
    //      mapContainerStyle={{ width: '100%', height: '400px' }}
    //    >
    //      {currentLocation && <Marker position={currentLocation} />}
    //    </GoogleMap>
    //  </LoadScript>
    <div>Google Map</div>
  )
}

export default MapView
import React from "react"
import { GoogleMap , LoadScript } from "@react-google-maps/api"

const Map = ({lat ,long}) =>{
    const containerStyle = {
        width : "100%",
        height : "350px",
    }

    const center = {
        lat : lat,
        long : long,
    }
    return(
        <LoadScript googleMapsApiKey="AIzaSyC_vsrDa_FhSmu8jClERaVOcWVk-q0Dlok">
            <GoogleMap
             mapContainerStyle={containerStyle}
             center={center}
             zoom={10}
            >
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;
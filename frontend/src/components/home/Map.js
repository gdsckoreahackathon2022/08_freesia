import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import styles from "./Map.css";
import styled from "styled-components";

function Map(props) {
  const { allCenters } = props;

  const GoogleMapWrap = styled.section`
    width: 80%;
    height: 100%;
  `;

  const Marker = ({ text }) => (
    <div className={styles.marker}>
      <span style={{ fontWeight: "700", whiteSpace: "nowrap" }}>{text}</span>
      <i style={{ fontSize: "20px" }} className="fas fa-map-marker-alt"></i>
    </div>
  );

  const defaultLocation = {
    lat: 37.5,
    lng: 127,
  };
  return (
    <GoogleMapWrap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAPEIGEf12unqTi_6if8i_okJEdgCPIeFY" }}
        defaultCenter={defaultLocation}
        defaultZoom={12}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {allCenters.map((center) => {
          return center.locationExistence ? (
            <Marker
              key={center.id}
              lat={center.lat}
              lng={center.lng}
              text={center.name}
            />
          ) : null;
        })}
      </GoogleMapReact>
    </GoogleMapWrap>
  );
}
export default Map;

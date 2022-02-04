import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import styles from "./Map.css";
import styled from "styled-components";

function Map(props) {
  /* const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.odcloud.kr/api/3034802/v1/uddi:b02570f5-750f-4d94-b071-eaacf44da22d_201909181751?page=1&perPage=185&serviceKey=etVnzaMzHlob02q94TO5AKnU9E28jM5XuzNYCQ%2FbQgKuLZGisLMCg2X6pJirrfPuv%2FAQ9M%2Fi1KPtOEFxn13jxQ%3D%3D"
    )
      .then((response) => response.json())
      .then((json) => {
        setCenters(json.data);
        setLoading(false);
      });
  }, []); */
  //const len = centers.length;
  //console.log(centers);

  const { allCenters } = props;

  const GoogleMapWrap = styled.section`
    width: 80%;
    height: 100%;
  `;

  const Marker = () => (
    <div className={styles.marker}>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  );

  const defaultLocation = {
    lat: 37.5,
    lng: 127,
  };

  //console.log(allCenters);

  //Geocode.setApiKey("AIzaSyCwoSjDdglMbH8LtCqWtenmKoaWpIQbO9Y");
  /* allCenters.map((center) => {
    const address = center["센터명"];
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        center.lat = lat;
        center.lng = lng;
        center.locationExistence = true;
      },
      (error) => {
        center.locationExistence = false;
        //console.error(error);
      }
    );
  }); */
  return (
    <GoogleMapWrap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCwoSjDdglMbH8LtCqWtenmKoaWpIQbO9Y" }}
        defaultCenter={defaultLocation}
        defaultZoom={11}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {allCenters.map((center) => {
          return center.locationExistence ? (
            <Marker key={center.id} lat={center.lat} lng={center.lng} />
          ) : null;
        })}
      </GoogleMapReact>
    </GoogleMapWrap>
  );
}

/* {<GoogleMap center={center} zoom={4}>
<Marker position={center} />
</GoogleMap
} */

export default Map;

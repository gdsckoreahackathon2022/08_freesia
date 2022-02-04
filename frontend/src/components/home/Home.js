import { useState, useEffect } from "react";
import Geocode from "react-geocode";
import NavBar from "../navbar/Navbar";
import List from "./CenterList";
import Map from "./Map";
import styled from "styled-components";

/* 
var mapOptions = {
  center: new google.maps.LatLng(51, -0.1),
  zoom: 5,
}; */
/* 
const GoogleMap = () => {
  return <Map zoom={8} initialCenter={{ lat: 0, lng: 0 }} />;
};
 */
function Home() {
  const [loading, setLoading] = useState(true);
  const [allCenters, setAllCenters] = useState([]);
  const [focusedCenterId, setFocusedCenterId] = useState(-1);
  useEffect(() => {
    fetch(
      "https://api.odcloud.kr/api/3034802/v1/uddi:b02570f5-750f-4d94-b071-eaacf44da22d_201909181751?page=1&perPage=185&serviceKey=etVnzaMzHlob02q94TO5AKnU9E28jM5XuzNYCQ%2FbQgKuLZGisLMCg2X6pJirrfPuv%2FAQ9M%2Fi1KPtOEFxn13jxQ%3D%3D"
    )
      .then((response) => response.json())
      .then((json) => {
        setAllCenters(json.data);
        setLoading(false);
      });
  }, []);

  Geocode.setApiKey("AIzaSyCwoSjDdglMbH8LtCqWtenmKoaWpIQbO9Y");

  allCenters.map((center, index) => {
    const address = center["센터명"];
    center.id = index;
    console.log(center);
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        center.lat = lat;
        center.lng = lng;
        center.locationExistence = true;
        //console.log(center);
      },
      (error) => {
        center.locationExistence = false;
        //console.error(error);
      }
    );
  });

  const ListGoogleMapWrap = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    margin-top: 70px;
  `;

  return (
    <ListGoogleMapWrap>
      <NavBar />
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "70%",
        }}
      >
        <List allCenters={allCenters} setFocusedCenterId={setFocusedCenterId} />
        <Map allCenters={allCenters} />
      </div>
    </ListGoogleMapWrap>
  );
}

export default Home;

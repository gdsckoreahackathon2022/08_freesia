import { useState, useEffect } from "react";
import Geocode from "react-geocode";
import NavBar from "../navbar/Navbar";
import List from "./CenterList";
import Map from "./Map";
import styled from "styled-components";
import axios from "axios";

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
  const [focusedCenter, setFocusedCenter] = useState({});
  const [searchedCity, setSearchedCity] = useState("");
  const [focusedLat, setFocusedLat] = useState(37);
  const [focusedLng, setFocusedLng] = useState(126);
  const [address, setAddress] = useState("");

  console.log("재실행");

  var encodeStr = encodeURI(`http://localhost:8080/center`);
  console.log(encodeStr);

  var decodeStr = decodeURI(encodeStr);
  console.log(decodeStr);

  var city = escape("서울특별시");

  useEffect(() => {
    fetch(
      "http://localhost:8080/center?address=" + "서울특별시"
      //"https://api.odcloud.kr/api/3034802/v1/uddi:b02570f5-750f-4d94-b071-eaacf44da22d_201909181751?page=1&perPage=185&serviceKey=etVnzaMzHlob02q94TO5AKnU9E28jM5XuzNYCQ%2FbQgKuLZGisLMCg2X6pJirrfPuv%2FAQ9M%2Fi1KPtOEFxn13jxQ%3D%3D"
    )
      .then((response) => response.json())
      .then((json) => {
        setAllCenters(json);
        console.log(allCenters);
        setLoading(false);
      });
  }, []);

  Geocode.setApiKey("AIzaSyCwoSjDdglMbH8LtCqWtenmKoaWpIQbO9Y");

  allCenters.map((center) => {
    const address = center.address;
    //const address = center.address;
    center.id = center[Math.random() * 10]; // 임시
    //console.log(center);
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

  /* useEffect(() => {
    const center = allCenters.map((center) => center);
    const address = center["센터명"];
    center.id = center[Math.random() * 10]; // 임시
    //console.log(center);
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
  }, [allCenters]); */

  const onSearchChange = (event) => {
    setSearchedCity(event.target.value);
  };

  const onSearchBtnClick = () => {
    Geocode.fromAddress(searchedCity).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setFocusedLat(lat);
        setFocusedLng(lng);
      },
      (error) => {
        console.log(error);
      }
    );
  };

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
      <div>
        <input type="text" onChange={onSearchChange}></input>
        <button onClick={onSearchBtnClick}>검색</button>
      </div>
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "70%",
        }}
      >
        <List allCenters={allCenters} setFocusedCenter={setFocusedCenter} />
        <Map allCenters={allCenters} />
      </div>
    </ListGoogleMapWrap>
  );
}

export default Home;

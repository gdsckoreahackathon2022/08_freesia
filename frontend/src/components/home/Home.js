import { useState, useEffect } from "react";
import Geocode from "react-geocode";
import NavBar from "../navbar/Navbar";
import CenterList from "./CenterList";
import Map from "./Map";
import styled from "styled-components";
import instance from "../jwtlogin/Request";
import axios from "axios";
import AuthenticationService from "../jwtlogin/AuthenticationService";

function Home() {
  const [allCenters, setAllCenters] = useState([]);
  const [focusedCenter, setFocusedCenter] = useState({});
  const [searchedCity, setSearchedCity] = useState("");
  const [focusedLat, setFocusedLat] = useState(37);
  const [focusedLng, setFocusedLng] = useState(126);

  useEffect(() => {
    instance
      .get(
        "/center?address=" + "서울특별시"
        //"https://api.odcloud.kr/api/3034802/v1/uddi:b02570f5-750f-4d94-b071-eaacf44da22d_201909181751?page=1&perPage=185&serviceKey=etVnzaMzHlob02q94TO5AKnU9E28jM5XuzNYCQ%2FbQgKuLZGisLMCg2X6pJirrfPuv%2FAQ9M%2Fi1KPtOEFxn13jxQ%3D%3D"
      )
      .then((response) => response.json())
      .then((json) => {
        setAllCenters(json);
      });
  }, []);

  Geocode.setApiKey("AIzaSyAPEIGEf12unqTi_6if8i_okJEdgCPIeFY");

  allCenters.map((center) => {
    Geocode.fromAddress(center.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        center.lat = lat;
        center.lng = lng;
        center.locationExistence = true;
        console.log(center);
      },
      (error) => {
        center.locationExistence = false;
        //console.error(error);
      }
    );
  });

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

  const handleSubmit = () => {
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
      <div style={{ marginBottom: "20px" }}>
        <input
          value={searchedCity}
          type="text"
          onChange={onSearchChange}
        ></input>
        <button onClick={onSearchBtnClick}>검색</button>
      </div>
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "70%",
        }}
      >
        <CenterList
          allCenters={allCenters}
          setFocusedCenter={setFocusedCenter}
        />
        <Map allCenters={allCenters} />
      </div>
    </ListGoogleMapWrap>
  );
}

export default Home;

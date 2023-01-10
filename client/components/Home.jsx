import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";

import HomeFeed from "./HomeFeed.jsx";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

const Home = ({ userInfo }) => {
  const userData = userInfo;

  const [posts, setPosts] = useState([]);

  // TODO: Make single request to convert zipcode to geospatial coordinate on every change
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [distance, setDistance] = useState(1609.344);

  //INSERT OWN GOOGLE MAPS API
  const GoogleMapsAPIKey = "AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GoogleMapsAPIKey,
  });

  Geocode.setApiKey(GoogleMapsAPIKey);

  const [markers, setMarkers] = useState([]);

  function getMarkers() {
    const tempMarkers = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].geoData) {
        const posObj = {
          lng: posts[i].geoData.coordinates[0],
          lat: posts[i].geoData.coordinates[1],
        };
        tempMarkers.push(<Marker position={posObj}></Marker>);
      } else console.log("no geodata");
    }
    setMarkers(tempMarkers);
  }

  async function getMap() {
    if (isLoaded) {
      let geocode = await Geocode.fromAddress(zipCode);
      const { lng, lat } = geocode.results[0].geometry.location;
      render(
        <GoogleMap
          center={{ lat: lat, lng: lng }}
          zoom={13}
          mapContainerStyle={{
            width: "35%",
            height: "90%",
            bottom: "2%",
            top: "8%",
            left: "2%",
            position: "absolute",
            borderRadius: "12px",
            boxShadow: "2px 2px 8px gray",
          }}
        >
          {markers}
        </GoogleMap>,
        document.getElementById("googleMapDiv")
      );
    }
  }

  async function getPosts() {
    let geocode = await Geocode.fromAddress(zipCode);

    const reqBody = {
      lng: geocode.results[0].geometry.location.lng,
      lat: geocode.results[0].geometry.location.lat,
      minDistance: 0,
      maxDistance: distance,
    };

    const res = await fetch(`/home/${userData.username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    const postsArr = await res.json();
    const newPost = Object.assign(postsArr, { userData: userData });
    setPosts(newPost);
    return (
      <>
        <div className="home">
          <HomeFeed props={posts} />
          <div id="googleMapDiv"></div>
        </div>
      </>
    );
  }

  // Cascading dependency
  // 1. Get Posts based on ZipCode and Distance
  // 2. Configure markers based on posts
  // 3. Render map based on markers and posts
  useEffect(() => {
    getPosts();
  }, [zipCode, distance]);

  useEffect(() => {
    getMarkers();
  }, [posts]);

  useEffect(() => {
    getMap();
  }, [markers]);

  return (
    <>
      <div className="home">
        <div className="background">
          <img src="https://i.redd.it/za30ryykl7n81.jpg"></img>
        </div>
        <div className="fade">
          <img />
        </div>
        <HomeFeed
          props={posts}
          zipCode={zipCode}
          setZipCode={setZipCode}
          distance={distance}
          setDistance={setDistance}
        />

        <div id="googleMapDiv"></div>
      </div>
    </>
  );
};

export default Home;

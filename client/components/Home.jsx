import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import HomeFeed from "./HomeFeed.jsx";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

const loadingStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  display: 'flex',
  p: 1,
};

const mapContainerStyle = {
  width: "35%",
  height: "90%",
  bottom: "2%",
  top: "8%",
  left: "2%",
  position: "absolute",
  borderRadius: "12px",
  boxShadow: "2px 2px 8px gray",
};

const GoogleMapsAPIKey = "AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM";
Geocode.setApiKey(GoogleMapsAPIKey);

const Home = ({ userInfo }) => {
  const userData = userInfo;

  const [isLoading, setIsLoading] = useState(false)

  const [posts, setPosts] = useState([]);

  // TODO: Make single request to convert zipcode to geospatial coordinate on every change
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [distance, setDistance] = useState(1609.344);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GoogleMapsAPIKey,
  });

  const [markers, setMarkers] = useState([]);

  const getMarkers = () => {
    const tempMarkers = [];
    posts.map(post => {
      if (post.geoData) {
        const posObj = {
          lng: post.geoData.coordinates[0],
          lat: post.geoData.coordinates[1],
        };
        tempMarkers.push(<Marker position={posObj}></Marker>);
      } else console.log("ALERT: Post contains no geospatial data");
    })
    setMarkers(tempMarkers);
  }

  const getMap = async () => {
    if (isLoaded) {
      try {
        const geocode = await Geocode.fromAddress(zipCode);
        const { lng, lat } = geocode.results[0].geometry.location;
        render(
          <GoogleMap
            center={{ lat: lat, lng: lng }}
            zoom={13}
            mapContainerStyle={mapContainerStyle}
          >
            {markers}
          </GoogleMap>,
          document.getElementById("googleMapDiv")
        );
      } catch (err) {
        console.log('ERROR: Cannot load Google Maps', err)
      }
    }
  }

  const getPosts = async () => {
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
  }

  // Cascading dependency of useEffect
  // 1. Get Posts based on ZipCode and Distance
  // 2. Configure markers based on posts
  // 3. Render map based on markers and posts
  useEffect(() => {
    // Start Loading indicator
    setIsLoading(true)
  },[])
  
  useEffect(() => {
    getPosts();
  }, [zipCode, distance]);

  useEffect(() => {
    getMarkers();
  }, [posts]);

  useEffect(() => {
    getMap();
    setIsLoading(false);
  }, [markers]);

  return (
    (isLoading) ? (
      <Box sx={loadingStyle}>
        <CircularProgress />
      </Box>
    ) : (
      <div className="home">
        {/* <div className="background">
          <img src="https://i.redd.it/za30ryykl7n81.jpg"></img>
        </div> */}
        {/* <div className="fade">
          <img />
        </div> */}
        <HomeFeed
          posts={posts}
          zipCode={zipCode}
          setZipCode={setZipCode}
          distance={distance}
          setDistance={setDistance}
        />
        <div id="googleMapDiv"></div>
      </div>
    )
  );
};

export default Home;

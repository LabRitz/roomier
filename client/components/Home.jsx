import React, { Component, useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
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

  const [filterArr, setFilterArr] = useState([])
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
    posts.map((post, i) => {
      if (post.geoData) {
        const posObj = {
          lng: post.geoData.coordinates[0],
          lat: post.geoData.coordinates[1],
        };
        tempMarkers.push(<Marker key={i} position={posObj}></Marker>);
      } else console.log("ALERT: Post contains no geospatial data");
    })
    setMarkers(tempMarkers);
  }

  const getMap = async () => {
    if (isLoaded) {
      try {
        const geocode = await Geocode.fromAddress(zipCode);
        const { lng, lat } = geocode.results[0].geometry.location;
        
        const container = document.getElementById("googleMapDiv")
        const root = createRoot(container);
        root.render(
          <GoogleMap
            center={{ lat: lat, lng: lng }}
            zoom={13}
            mapContainerStyle={mapContainerStyle}
          >
            {markers}
          </GoogleMap>
        );
      } catch (err) {
        console.log('ERROR: Cannot load Google Maps', err)
      }
    }
  }

  const getPosts = async () => {
    try {
      const geocode = await Geocode.fromAddress(zipCode);
      // Gracefully handle for non OK requests
      if (geocode.status !== 'OK') return setPosts([]);
  
      const res = await fetch(`/home/${userData.username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lng: geocode.results[0].geometry.location.lng,
          lat: geocode.results[0].geometry.location.lat,
          minDistance: 0,
          maxDistance: distance,
        }),
      });
      const postsArr = await res.json();
      const filterPosts = (filterArr.length !== 0) ? postsArr.filter(post => {
        for (const filter of filterArr) {
          if (post.description[filter.toLowerCase()]) return post
        }
      }): postsArr;
      const newPosts = Object.assign(filterPosts, { userData: userData });
      setPosts(newPosts);
    } catch (err) {
      console.log('ERROR: Cannot get posts at zip code', err)
    }
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
  }, [zipCode, distance, filterArr]);

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
        <HomeFeed
          posts={posts}
          zipCode={zipCode}
          setZipCode={setZipCode}
          distance={distance}
          setDistance={setDistance}
          filterArr={filterArr}
          setFilterArr={setFilterArr}
        />
        <div id="googleMapDiv"></div>
      </div>
    )
  );
};

export default Home;

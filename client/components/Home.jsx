import React, { useState, useEffect } from "react";
import { render } from 'react-dom'
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
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  boxShadow: "2px 2px 8px gray",
};

const GoogleMapsAPIKey = "AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM";
Geocode.setApiKey(GoogleMapsAPIKey);

const Home = ({ userInfo }) => {
  const currUser = userInfo;

  const [isLoading, setIsLoading] = useState(false)

  const [filterArr, setFilterArr] = useState([])
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([])

  // TODO: Make single request to convert zipcode to geospatial coordinate on every change
  const [zipCode, setZipCode] = useState(currUser.zipCode);
  const [distance, setDistance] = useState(1609.344);
  const [priceRange, setPriceRange] = useState([3000, 8000]);
  const [sqftRange, setSqftRange] = useState([200, 1500]);
  const [br, setBR] = useState(0)
  const [ba, setBA] = useState(1)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GoogleMapsAPIKey,
  });

  const [markers, setMarkers] = useState([]);

  const getMarkers = () => {
    const tempMarkers = [];
    filterPosts.map((post, i) => {
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
        
        render( 
          <GoogleMap
            center={{ lat: lat, lng: lng }}
            zoom={13}
            mapContainerStyle={mapContainerStyle}
          >
            {markers}
          </GoogleMap> , document.getElementById("googleMapDiv"));
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
  
      const res = await fetch(`/home/${currUser.username}`, {
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

      // Map across each post and append the current user to each post
      const newPosts = postsArr.map(post => {
        return Object.assign(post, { currUser: currUser })
      });
      setPosts(newPosts);
    } catch (err) {
      console.log('ERROR: Cannot get posts at zip code', err)
    }
  }

  const applyFilter = () => {
    const newPosts = []
    posts.forEach(post => {
      if (post.rent >= priceRange[0] && 
          post.rent <= priceRange[1] &&
          post.description.sqFt >= sqftRange[0] && 
          post.description.sqFt <= sqftRange[1] &&
          post.description.BR >= br && 
          post.description.BA >= ba ) {
        if (filterArr.length !== 0) {
          for (const filter of filterArr) {
            if (post.description[filter.toLowerCase()]) {
              newPosts.push(post)
              break
            }
          }
        }
        else newPosts.push(post)
      }
    })
    setFilterPosts(newPosts)
  }

  // Cascading dependency of useEffect
  // 1. Get Posts based on ZipCode and Distance
  // 2. Filter posts by user filter
  // 3. Configure markers based on posts
  // 4. Render map based on markers and posts
  useEffect(() => {
    setIsLoading(true)
  },[])
  
  useEffect(() => {
    getPosts();
  }, [zipCode, distance]);

  useEffect(() => {
    applyFilter();
  }, [posts]);

  useEffect(() => {
    getMarkers();
  }, [filterPosts]);

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
        <div id="googleMapDiv"></div>
        <HomeFeed
          posts={filterPosts}
          zipCode={zipCode}
          setZipCode={setZipCode}
          distance={distance}
          setDistance={setDistance}
          filterArr={filterArr}
          setFilterArr={setFilterArr}
          priceRange={priceRange} 
          setPriceRange={setPriceRange}
          sqftRange={sqftRange} 
          setSqftRange={setSqftRange}
          applyFilter={applyFilter}
          br={br}
          setBR={setBR}
          ba={ba}
          setBA={setBA}
        />
      </div>
    )
  );
};

export default Home;

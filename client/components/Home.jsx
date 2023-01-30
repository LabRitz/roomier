import React, { useState, useEffect, lazy } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

const HomeFeed = lazy(() => import("./HomeFeed.jsx"));

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

  const [zipCode, setZipCode] = useState(currUser.zipCode);
  const [center, setCenter] = useState(null)
  const [distance, setDistance] = useState(1609.344*2);
  const [priceRange, setPriceRange] = useState([3000, 8000]);
  const [sqftRange, setSqftRange] = useState([200, 1500]);
  const [br, setBR] = useState(0)
  const [ba, setBA] = useState(1)

  // Google Maps 
  const [mapref, setMapRef] = useState(null);
  const handleOnLoad = (map) => { setMapRef(map) };
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      setCenter({lat: newCenter.lat(), lng: newCenter.lng()});
    }
  };

  const [markers, setMarkers] = useState([]);

  const getGeo = async () => {
    try {
      const geocode = await Geocode.fromAddress(zipCode);
      if (geocode.status == 'OK') {
        const { lng, lat } = geocode.results[0].geometry.location;
        setCenter({ lat: lat, lng: lng })
      }
    } catch (err) {
      console.log('ERROR: Cannot find zipcode', err)
    }
  }
  
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

  const getPosts = async () => {
    if (!center) return setPosts([])
    try {  
      const res = await fetch(`/home/${currUser.username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lng: center.lng,
          lat: center.lat,
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
  useEffect(() => {
    setIsLoading(true)
  },[])
  
  useEffect(() => {
    getGeo();
  }, [zipCode]);

  useEffect(() => {
    getPosts();
  }, [center, distance]);

  useEffect(() => {
    applyFilter();
  }, [posts]);

  useEffect(() => {
    getMarkers();
    setIsLoading(false);
  }, [filterPosts]);

  return (
    (isLoading) ? (
      <Box sx={loadingStyle}>
        <CircularProgress />
      </Box>
    ) : (
      <div className="home">
        <div id="googleMapDiv">
          <GoogleMap
            center={center}
            clickableIcons={true}
            mapContainerStyle={mapContainerStyle}
            onLoad={handleOnLoad}
            onDragEnd={handleCenterChanged}
            zoom={13}
          >
            <Circle 
              center={center}
              options={{
                strokeColor: '#3D5A80',
                strokeOpacity: 1,
                strokeWeight: 10,
                fillColor: '#3D5A80',
                fillOpacity: 0.8,
                radius: .1,
                zIndex: 1
              }}/>
            <Circle 
              center={center}
              options={{
                strokeColor: '#3D5A80',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: '#3D5A80',
                fillOpacity: 0.35,
                radius: distance,
                zIndex: -1
              }}/>
            {markers}
          </GoogleMap>
        </div>
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

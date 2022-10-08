import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { render } from 'react-dom';

import NavBar from './NavBar.jsx';
import HomeFeed from './HomeFeed.jsx';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

const Home = (props) => {


  const location = useLocation();
  const userData = location.state;

  const [posts, setPosts] = useState(null);
  const [passedProps, setPassedProps] = useState(false);

  // TODO: Make single request to convert zipcode to geospatial coordinate on every change
  const [zipCode, setZipCode] = useState(userData.zipCode); 
  const [distance, setDistance] = useState(3218.688)
  
  //INSERT OWN GOOGLE MAPS API
  const GoogleMapsAPIKey = 'AIzaSyCtt8vCUrFi12hwFLomHI-hVt2G2iRP-HA' 

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GoogleMapsAPIKey
  })

  Geocode.setApiKey(GoogleMapsAPIKey);
  
  async function onMapLoad() {
    const markers = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].geoData) {
        const posObj = {
          lng: posts[i].geoData.coordinates[0],
          lat: posts[i].geoData.coordinates[1]
        }
        markers.push(<Marker position={posObj}></Marker>)
      } else console.log('no geodata')
    }
    console.log('isLOaded: ', isLoaded);
    console.log('Error for loaded: ', loadError);
    if (isLoaded) {
      let geocode = await Geocode.fromAddress(zipCode)
      const {lng, lat}  = geocode.results[0].geometry.location
      render(
        <GoogleMap
          center={{ lat: lat, lng: lng }}
          zoom={13}
          mapContainerStyle={{ width: '35%', height: '90%', bottom: '2%', top: '8%', left: '2%', position: 'absolute', borderRadius: '12px', boxShadow: '2px 2px 8px gray'}}
        >
          {markers}
        </GoogleMap>,
        document.getElementById('googleMapDiv')
      )
    }
  }

  async function getPosts() {
    let geocode = await Geocode.fromAddress(zipCode)

    const reqBody = {
      lng : geocode.results[0].geometry.location.lng,
      lat : geocode.results[0].geometry.location.lat,
      minDistance : 0,
      maxDistance : distance
    }

    const res = await fetch(`/home/${userData.username}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)
    })
    const postsArr = await res.json()
    const newPost = Object.assign(postsArr, {userData: userData})
    setPosts(newPost)
    setPassedProps(true)
    return (
      <>
        <div className='home'>
          <NavBar />
          <HomeFeed props={posts} />
          <div id='googleMapDiv'></div>
        </div>
      </>
    )
  }

  useEffect(() => {
    console.log('inside of getPosts useEffect');
    getPosts()
  }, [zipCode, distance]);

  useEffect(() => {
    if (passedProps) {
      onMapLoad()
    }
  }, [passedProps])

  if (posts) {
    return (
      <>
        <div className='home'>
          <NavBar />
          <div className='background'>
            <img src='https://i.redd.it/za30ryykl7n81.jpg'></img>
          </div>
          <div className="fade">
            <img/>
          </div>
          <HomeFeed 
            props = {posts} 
            zipCode = {zipCode} 
            setZipCode = {setZipCode}
            distance = {distance}
            setDistance = {setDistance}/>

          <div id='googleMapDiv'></div>
        </div>
      </>
    )
  } else return null
}

export default Home;
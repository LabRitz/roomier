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
  // console.log('metaData from Home: ', userData)
  const [posts, setPosts] = useState(null);
  const [passedProps, setPassedProps] = useState(false);
  
  //INSERT OWN GOOGLE MAPS API
  const GoogleMapsAPIKey = 'AIzaSyCtt8vCUrFi12hwFLomHI-hVt2G2iRP-HA' 

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GoogleMapsAPIKey
  })

  Geocode.setApiKey(GoogleMapsAPIKey);
  
  // async function onMapLoad() {
  function onMapLoad() {
    const markers = [];
    // const tempArr = []
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].geoData) {
        const posObj = {
          lng: posts[i].geoData.coordinates[0],
          lat: posts[i].geoData.coordinates[1]
        }
        markers.push(<Marker position={posObj}></Marker>)
      } else console.log('no geodata')
    }

    if (isLoaded) {
      render(
        <GoogleMap
          center={{ lat: 40.748441, lng: -73.985664 }}
          zoom={13}
          mapContainerStyle={{ width: '35%', height: '90%', bottom: '2%', top: '8%', left: '2%', position: 'absolute', borderRadius: '12px', boxShadow: '2px 2px 8px gray'}}
        >
          {markers}
        </GoogleMap>,
        document.getElementById('googleMapDiv')
      )
    }
  }

  useEffect(() => {
    fetch(`/home/${userData.username}`)
      .then(data => data.json())
      .then(postsArr => {
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
      })
  }, []);

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
          <HomeFeed props = {posts}/>

          <div id='googleMapDiv'></div>
        </div>
      </>
    )
  } else return null
}

export default Home;
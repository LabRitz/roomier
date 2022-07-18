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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyC_okJNBkwBu8ceXP1UlIL3jhSzf8YeQiw'
  })

  Geocode.setApiKey('AIzaSyC_okJNBkwBu8ceXP1UlIL3jhSzf8YeQiw');
  
  const markers = [];
  async function onMapLoad() {
    console.log('post: ', posts)
    const tempArr = []
    for (let i = 0; i < posts.length; i++) {
      const { street1, city, state, zipCode } = posts[i].address;
      await Geocode.fromAddress(`${street1} ${city} ${state} ${zipCode}`)
        .then(data => {
          const { lat, lng } = data.results[0].geometry.location;
          tempArr.push({ lat, lng });
        });
    }

    for (let i = 0; i < tempArr.length; i++) {
      markers.push(<Marker position={tempArr[i]}></Marker>)
    }
    
    if (isLoaded) {
      render(
        <GoogleMap
          center={{ lat: 40.748441, lng: -73.985664 }}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%', top: '0', left: '0', position: 'absolute', zIndex: '-1' }}
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
        return (
          <>
            <div className='home'>
              <NavBar />
              <HomeFeed props={posts} />
            </div>
          </>
        )
      })
  }, []);

  useEffect(() => {
    console.log('second useEffect')
    if (passedProps) {
      onMapLoad()
    }
  }, [passedProps])

  if (posts) {

    return (
      <>
        <div className='home'>
          <NavBar />
          <HomeFeed props={posts} />
          <div id='googleMapDiv'></div>
        </div>
      </>
    )
  } else return null
}

export default Home;
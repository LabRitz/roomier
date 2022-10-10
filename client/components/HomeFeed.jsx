/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import ContainerFeed from './ContainerFeed.jsx';

import styles from '../stylesheets/homeFeed.scss'

const HomeFeed = ({props, zipCode, setZipCode, setDistance}) => {
  
  //Initialize state to apt array
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const tempArr = [];
    for (let i = 0; i < props.length; i++) {
      const data = Object.assign(props[i], {applicationInfo: props.userData})
      tempArr.push(<ContainerFeed key={i} props={data}/>)
    }
    setFeed(tempArr)
  }, [props])  

  // Set user's location 
  const handleInput = (val) => {
    setZipCode(val)
  }

  // Set user's max distance
  const handleDistance = (e) => {
    const meters = 1609.344 * e.target.value;
    setDistance(meters)
  }

  return (
    <>
      <div className='homeFeed'>
        <div className="filter">
          <div className="userLocation">
            {/* zipcode => converted to geospatial coordinates in Home.jsx*/}
            <input 
              id='zipCode'
              type="number" 
              placeholder={zipCode} 
              pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            ></input>
            <button onClick={() => handleInput(document.getElementById('zipCode').value)}>Submit</button>
          </div>
          <div className="distance">
            <label htmlFor="distance">Distance(mi):</label>
            <select name='distance' id='distance' onChange={handleDistance}>
              <option value={1}>1 mi</option>
              <option value={2}>2 mi</option>
              <option value={5}>5 mi</option>
              <option value={10}>10 mi</option>
            </select>
          </div>
        </div>
        {feed}
      </div>
    </>
  )

}

export default HomeFeed;
import React, { Component } from 'react';
import { useState } from 'react';

import ContainerFeed from './ContainerFeed.jsx';

import styles from '../stylesheets/homeFeed.scss'

const HomeFeed = ({props}) => {

  //Initialize apt to push to arr
  const apt = {
    picture: 'https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/static/optimized/rev-f9654ed/online-decorating/wp-content/uploads/2020/07/Modern-apartment-decor-for-a-rustic-studio-unit.jpg',
    address: {
      street1: '100 West 31st Street',
      street2: '#18D',
      city: 'New York City',
      state: 'NY',
      zipCode: '10036',
    },
    roommate: {
      gender: 'no-preference',
    },
    description: {
      BR: 1,
      BA: 1,
      sqFt: 450,
      pets: true,
      smoking: false,
      parking:false,
      condition: 'Slightly used'
    },
    moveInDate: new Date().toString,
    utilities: 159,
    rent: 4700,
    bio:'Located at 100 West 31st Street, EOS offers distinctive residences, curated amenities, and the personalized service needed to engage New York City life to the fullest inside and out. Premier recreation and relaxation facilities for residents to enjoy include a pool, fitness center on the lower level, as well as a game room and entertaining areas on the towers 47th floor with sweeping views of Manhattan. EOS offers 375 smoke-free rental residences consisting of studios, one, two, and two bedroom + den layouts. Each apartment contains a washer/dryer, dishwasher, hardwood floors, and kitchens and bathrooms with premium finishes and fixtures.' 
  }
  // Push 5 apts to arr
  const arr = []
  for(let i = 0; i  <  5; i++) {
    arr.push(apt)
  }

  console.log('what is props: ', props)

  //Initialize state to apt array
  // const [state, setState] = useState(arr)
  const [state, setState] = useState(props)

  const feed = []
  for (let i = 0; i < state.length; i++) {
    feed.push(<ContainerFeed props={state[i]}/>)
  }

  return (
    <>
      <div className='homeFeed'>
        {feed}
      </div>
    </>
  )

}

export default HomeFeed;
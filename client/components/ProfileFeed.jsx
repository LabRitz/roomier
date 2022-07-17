import React, { Component } from 'react';
import { useState } from 'react';

import ContainerApplication from './ContainerApplication.jsx';

import styles from '../stylesheets/profileFeed.scss'

const ProfileFeed = ({props}) => {

  // *****DUMMY DATA*****
  //Initialize apt to push to arr
  const apt1 = {
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
  const apt2 = {
    picture: 'https://photos.zillowstatic.com/fp/ce4e76155c6843768192a9e61ea57c59-se_extra_large_1500_800.webp',
    address: {
      street1: '515 West 36th Street',
      street2: '#36D',
      city: 'New York',
      state: 'NY',
      zipCode: '10018',
    },
    roommate: {
      gender: 'male',
    },
    description: {
      BR: 2,
      BA: 2,
      sqFt: 850,
      pets: true,
      smoking: false,
      parking: true,
      condition: 'Slightly used'
    },
    moveInDate: new Date().toString,
    utilities: 709,
    rent: 8650,
    bio:'This oversized three bedroom, two bathroom residence is on a high floor with incredible city views.. The home features beautiful hardwood floors throughout, a windowed kitchen with top-of-the-line appliances, and streaming natural light. Additional conveniences include excellent closet space and storage through-out. Building amenities at Yorkshire Towers include 24-hour doormen, an indoor swimming pool, fitness center, resident lounge, on-site garage, on-site dry cleaning and valet services, and laundry on every floor.'
  }
  // Push 5 apts to arr
  const arr = []
  for(let i = 0; i  <  3; i++) {
    arr.push(apt1)
    arr.push(apt2)
  }
  // **********************

  //Initialize state to apt array
  const [state, setState] = useState(arr)

  const feed = []
  for (let i = 0; i < state.length; i++) {
    feed.push(<ContainerApplication props={state[i]}/>)
  }

  return (
    <>
      <div className='profileFeed'>
        {feed}
      </div>
    </>
  )

}

export default ProfileFeed;
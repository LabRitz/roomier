import React, { Component } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerFeed.scss'

const ContainerFeed = ({props}) => {
  // Need props to pass down user info and application info

  const state = {
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
      sqft: 450,
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

  const applications = [];

  function handleChange(e) {
    // user as applicant to post
    // const value = e.target.value
    // fetch('/', git 
  }

  return (
    <div className='feed'>
      <Card props={state}/>
      <div className="apply">
        <input type='checkbox' className='apply' onChange={(e) => handleChange(e)}></input>
        <p>{applications.length} pending application(s)</p>
      </div>
    </div>
  )
}

export default ContainerFeed;
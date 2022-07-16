import React, { Component } from 'react';

import styles from '../stylesheets/card.scss';

const Card = ({props}) => {

  const {
          picture,
          address,
          roommate,
          description,
          moveInDate,
          utilities,
          rent,
          bio
        } = props

  return (
    <>
      <div className='card'>
        <div className="header">
          <div className="img">
            <img src={picture} alt='insert sweet looking apartment'></img>
          </div>
          <div className="data">
            <p className='rent'><span className='bold'>Rent: </span> ${rent}/mo</p>
            <p><span className='bold'>Utilities: </span> ${utilities}/mo</p>
            <p><span className='bold'>{description.BR}BR {description.BA}BA</span> {description.sqft} sqft</p>
            <p><span className='bold'>Condition: </span> {description.condition}</p>
            <p><span className='bold'>Move-in Date: </span> ${moveInDate}</p>
          </div>
        </div>
        <div className="info">
          <p>{address.street1}, {address.street2}, {address.city}, {address.state} {address.zipCode}</p>
          <p>Roommate seeking: {roommate.gender}</p>
          <><label>Pet friendly: </label><input type={'checkbox'} defaultValue={description.pets}></input></>
          <><label>Smoker friendly: </label><input type={'checkbox'} defaultValue={description.smoking}></input></>
          <><label>Parking availability: </label><input type={'checkbox'} defaultValue={description.parking}></input></>
          <p>{bio}</p>
        </div>
      </div>
    </>
  )

}

export default Card;
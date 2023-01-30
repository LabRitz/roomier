/* eslint-disable react/prop-types */
import React from 'react';

import '../stylesheets/card.scss';
import Gallery from './Gallery.jsx';

const Card = ({ postInfo }) => {
  const {
    address,
    roommate,
    description,
    moveInDate,
    utilities,
    rent,
    bio,
    images
  } = postInfo;

  if (description.condition === undefined) description.condition = 'Slightly used';

  return (
    <>
      <div className='card'>
        <div className="header">
          <div className="img">
            <Gallery imgArr={images}/>
          </div>
          <div className="data">
            <p className='address'>{address.street1} {address.street2}</p>
            <p className='address cityState'>{address.city}, {address.state} {address.zipCode}</p>

            <p className='rent'><span className='bold'>Rent: </span> ${rent}/mo</p>
            <p><span className='bold'>Utilities: </span> ${utilities}/mo</p>
            <p><span className='bold'>Condition: </span> {description.condition}</p>
            <p><span className='bold'>Move-in Date: </span>{moveInDate.slice(0,10)}</p>
          </div>
        </div>
        <div className="info">
          <p><span className='bold'>{description.BR}BR | {description.BA}BA | {description.sqFt} sqft</span></p>
          <p>Roommate seeking: {roommate.gender}</p>
          <><label>Pet friendly: </label><input type={'checkbox'} readOnly checked={description.pets}></input></>
          <br/>
          <><label>Smoker friendly: </label><input type={'checkbox'} readOnly checked={description.smoking}></input></>
          <br/>
          <><label>Parking availability: </label><input type={'checkbox'} readOnly checked={description.parking}></input></>
          <p className='bio'>{bio}</p>
        </div>
      </div>
    </>
  )

}

export default Card;
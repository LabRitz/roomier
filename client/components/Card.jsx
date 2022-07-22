import React, { Component, useState } from 'react';

import styles from '../stylesheets/card.scss';

const Card = ({props}) => {
  let {
        picture,
        address,
        roommate,
        description,
        moveInDate,
        utilities,
        rent,
        bio
      } = props;
    
  const [imgIndex, setIndex] = useState(0)
  const [imgSrc, setImg] = useState('https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg')
  
  useEffect(()=> {
    setTimeout(() => {
      if (imgIndex + 1 > picture.length) setIndex(0)
      else setIndex(imgIndex + 1)
      
      if (picture.length !== 0) setImg(Object.keys(picture[imgIndex])[0])
    }, 5000)
  }, [imgIndex])

  if (description.condition === undefined) description.condition = 'Slightly used';

  return (
    <>
      <div className='card'>
        <div className="header">
          <div className="img">
            <img src={imgSrc} alt='insert sweet looking apartment'></img>
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
          <><label>Pet friendly: </label><input type={'checkbox'} checked={description.pets}></input></>
          <br/>
          <><label>Smoker friendly: </label><input type={'checkbox'} checked={description.smoking}></input></>
          <br/>
          <><label>Parking availability: </label><input type={'checkbox'} checked={description.parking}></input></>
          <p className='bio'>{bio}</p>
        </div>
      </div>
    </>
  )

}

export default Card;
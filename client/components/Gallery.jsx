import React, { Component, useEffect, useState } from 'react';

import styles from '../stylesheets/gallery.scss'

// imgArr => Array of Object key value pairs { Image urls:  Firebase file paths }
const Gallery = ({ imgArr }) => {
  const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'
  const [index, setIndex] = useState(0) // Index for gallery image
 
  function handleClick(dir) {
    if (index + dir < 0) setIndex(imgArr.length - 1)
    else if (index + dir > imgArr.length - 1) setIndex(0)
    else setIndex(index + dir);
  }

  return (
    <div className="preview">
      <div id='imgBtns'>
        <button id='imgLeft' onClick={() => handleClick(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
          </svg>
        </button>
        <button id='imgRight' onClick={() => handleClick(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
          </svg>
        </button>
      </div>
      <img src={(!imgArr[index]) ? defaultImg : Object.keys(imgArr[index])[0]} id="imgPreview" alt='picture of rental property'></img>
    </div>
  )
}

export default Gallery;
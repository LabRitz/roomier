import React, { Component } from 'react';
import NavBar from './NavBar.jsx';

import styles from '../stylesheets/createPost.scss';

const createPostSubmissions = (e) => {
    e.preventDefault();
    const address1 = document.getElementById('street1').value;
    const address2 = document.getElementById('street2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;
    const genderPreference = document.getElementById('dropDownMenu').value;
    const bedroom = document.getElementById('bedroom').value;
    const bathroom = document.getElementById('bathroom').value;
    const sqft = document.getElementById('sqft').value;
    const condition = document.getElementById('condition').value;
    const utilities = document.getElementById('utilities').value;
    const rent = document.getElementById('rent').value;
    const bio = document.getElementById('bio').value;
    const pets = JSON.parse(document.getElementById('dropDownMenuPets').value);
    const smoking = JSON.parse(document.getElementById('dropDownMenuSmoking').value);
    const parking = JSON.parse(document.getElementById('dropDownMenuParking').value);

    const reqBody = {
        // picture: ,
        address: {
            street1: address1,
            street2: address2,
            city: city,
            state: state,
            zipCode: zipCode
        },
        roommate: {
            gender: genderPreference,
        },
        description: {
            BR: bedroom,
            BA: bathroom,
            sqFt: sqft,
            pets: pets,
            smoking: smoking,
            parking: parking,
            condition: condition,
        },
        // moveInDate: ,
        utilities: utilities,
        rent: rent,
        bio: bio,
    };

    // console.log(reqBody)

    fetch('/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: reqBody
        })
        .then(data => data.json()) 
        .then((formattedData) => {
            console.log(formattedData)
        })
        .catch(err => {
            console.log('Error thrown in POST request in createPost: ', err)
        })
};

const CreatePost = (props) => {
    return (
        <div className='createPost'>
            <NavBar />
            <div className='createPostRoute'>
                  
                  <div className="price">
                    <h2>List Price</h2>
                    <h3 id="rentTag">Rent</h3>
                    <input type={'number'} id="rent"></input>
                    <h3 id="utilitiesTag">Utilities</h3>
                    <input type={'text'} id="utilities"></input>
                    <div className="preference">
                      <h3 id="genderTag">Gender Preference </h3>

                      <select name="genders" id="dropDownMenu">
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                          <option value='no-preference'>No-preference</option>
                      </select>
                    </div>
                  </div>
                <div className="house">
                  <h2>Listing Address</h2>

                  <h3 id="addressTag">Address</h3>
                  <div className="address">
                    <input type={'text'} id="street1" placeholder='Street address or P.O. Box'></input>
                    <input type={'text'} id="street2" placeholder='Apt, suite, unit, building, floor, etc'></input>
                  </div>

                  <h5 id="cityTag">City</h5>
                  <input type={'text'} id="city"></input>

                  <h5 id="stateTag">State</h5>
                  <input type={'text'} id="state"></input>

                  <h5 id="zipTag">Zip Code</h5>
                  <input type={'text'} id="zipCode"></input>
                </div>  


                <div className="description">
                  <h3 id="DescriptionTag">Description </h3>
                  <div className="basic">
                    <div>
                      <h5 id="bedroomTag">Bedrooms</h5>
                      <input type={'number'} id="bedroom"></input>
                    </div>
                    <div>
                      <h5 id="bathroomTag">Bathrooms</h5>
                      <input type={'number'} id="bathroom"></input>
                    </div>
                    <div>
                      <h5 id="sqftTag">Sq ft</h5>
                      <input type={'number'} id="sqft"></input>
                    </div>
                  </div>

                  <h5 id="petsTag">Pets</h5>

                  <select name="pets" id="dropDownMenuPets">
                      <option value={true}>Allowed</option>
                      <option value={false}>Not Allowed</option>
                  </select>

                  <h5 id="smokingTag">Smoking</h5>
                  <select name="smoking" id="dropDownMenuSmoking">
                      <option value={true}>Allowed</option>
                      <option value={false}>Not Allowed</option>
                  </select>

                  <h5 id="parkingTag">Parking</h5>
                  <select name="parking" id="dropDownMenuParking">
                      <option value={true}>Allowed</option>
                      <option value={false}>Not Allowed</option>
                  </select>

                  <h5 id="conditionTag">Condition</h5>
                  <input type={'text'} id="condition"></input>
                </div>
                {/* <h3 id="moveInDateTag">Move In Date</h3>
                <input type={'text'} id="moveInDate" placeholder='Street address or P.O. Box'></input>
                <button type='submit' id='submitAdress' onClick={createPostSubmissions}>enter</button> */}
                <div className="bio">
                  <h3 id="bioTag">Bio</h3>
                  <input type={'text'} id="bio"></input>
                  <button type='submit' id='submitPost' onClick={createPostSubmissions}>
                    <h2>Post</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                  </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
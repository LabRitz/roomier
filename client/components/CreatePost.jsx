import React, { Component } from 'react';
import NavBar from './NavBar.jsx';


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
                <h2>Home Facts</h2>

                <h3 id="adressTag">Address</h3>

                <input type={'text'} id="street1" placeholder='Street address or P.O. Box'></input>
                <input type={'text'} id="street2" placeholder='Apt, suite, unit, building, floor, etc'></input>

                <h5 id="cityTag">City</h5>
                <input type={'text'} id="city"></input>

                <h5 id="stateTag">Sate</h5>
                <input type={'text'} id="state"></input>

                <h5 id="zipTag">Zip Code</h5>
                <input type={'text'} id="zipCode"></input>

                <h3 id="genderTag">Gender Prefrence </h3>

                <select name="genders" id="dropDownMenu">
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='no-preference'>No-preference</option>
                </select>

                <h3 id="DescriptionTag">Description </h3>

                <h5 id="bedroomTag">Bedrooms</h5>
                <input type={'number'} id="bedroom"></input>

                <h5 id="bathroomTag">Bathrooms</h5>
                <input type={'text'} id="bathroom"></input>

                <h5 id="sqftTag">Sq ft</h5>
                <input type={'number'} id="sqft"></input>

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
                {/* <h3 id="moveInDateTag">Move In Date</h3>
                <input type={'text'} id="moveInDate" placeholder='Street address or P.O. Box'></input>
                <button type='submit' id='submitAdress' onClick={createPostSubmissions}>enter</button> */}

                <h3 id="utilitiesTag">Utilities</h3>
                <input type={'text'} id="utilities"></input>

                <h3 id="utilitiesTag">Rent</h3>
                <input type={'number'} id="rent"></input>

                <h3 id="bioTag">Bio</h3>
                <input type={'text'} id="bio"></input>
                <button type='submit' id='submitPost' onClick={createPostSubmissions}>Submit</button>
            </div>
        </div>
    );
};


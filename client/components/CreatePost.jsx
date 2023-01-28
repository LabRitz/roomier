import React, { Component, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Geocode from "react-geocode";

import Gallery from "./Gallery.jsx";

import "../stylesheets/createPost.scss";

const CreatePost = ({ userInfo }) => {
  const userData = userInfo;

  // Initialize states for
  const [imageUpload, setImageUpload] = useState(null);
  const [imgArr, setImgArr] = useState([]);

  const firebaseUploadImage = async () => {
    if (imageUpload) {
      const imgPath = `images/${userData.username}/${imageUpload.name}`
      const imgRef = ref(storage, imgPath);
      try {
        await uploadBytes(imgRef, imageUpload);
        const imgUrl = await getDownloadURL(imgRef);
        const imgObj = {
          imgUrl: imgUrl,
          imgPath: `images/${userData.username}/${imageUpload.name}`
        };
        setImgArr([...imgArr, imgObj]);
        document.querySelector("#imgPreview").src = imgURL;
      } catch (err) {
        console.log('ERROR: Cannot upload to Firebase')
      }
    } else {
      alert("No image selected");
    }
  };

  const createPostSubmissions = async (e) => {
    e.preventDefault();

    const address1 = document.getElementById("street1").value;
    const address2 = document.getElementById("street2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("zipCode").value;
    const genderPreference = document.getElementById("dropDownMenu").value;
    const bedroom = document.getElementById("bedroom").value;
    const bathroom = document.getElementById("bathroom").value;
    const sqft = document.getElementById("sqft").value;
    const condition = document.getElementById("condition").value;
    const utilities = document.getElementById("utilities").value;
    const rent = document.getElementById("rent").value;
    const bio = document.getElementById("bio").value;
    const pets = JSON.parse(document.getElementById("dropDownMenuPets").value);
    const smoking = JSON.parse(
      document.getElementById("dropDownMenuSmoking").value
    );
    const parking = JSON.parse(
      document.getElementById("dropDownMenuParking").value
    );
    const moveInDate = document.getElementById("date").value;

    if (
      address1 === "" ||
      city === "" ||
      state === "" ||
      zipCode === "" ||
      genderPreference === "" ||
      sqft === "" ||
      utilities === "" ||
      rent === "" ||
      moveInDate === null
    ) {
      alert("Must Require Input Fields");
    } 

    let geoData
    try {
      const geo = await Geocode.fromAddress(
        `${address1} ${city} ${state} ${zipCode}`
      );
      const { lat, lng } = geo.results[0].geometry.location;
      geoData = { lat: lat, lng: lng };
    } catch (err) {
      console.log(
        `ERROR: Unable to resolve coordinates of ${address1} ${city} ${state} ${zipCode}:`,
        err
      );
    }

    try {
      const reqBody = {
        address: {
          street1: address1,
          street2: address2,
          city: city,
          state: state,
          zipCode: zipCode,
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
        moveInDate: moveInDate,
        utilities: utilities,
        rent: rent,
        bio: bio,
        userData: userData,
        applications: [],
        geoData: geoData,
        images: imgArr,
      };
      const res = await fetch("/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      })
      const data = await res.json()
      if (data) {
        console.log("SUCCESS: Created post", data);

        // Clear form document
        document.getElementById("street1").value = "";
        document.getElementById("street2").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("zipCode").value = "";
        document.getElementById("dropDownMenu").value = "";
        document.getElementById("bedroom").value = "";
        document.getElementById("bathroom").value = "";
        document.getElementById("sqft").value = "";
        document.getElementById("condition").value = "";
        document.getElementById("utilities").value = "";
        document.getElementById("rent").value = "";
        document.getElementById("bio").value = "";
        document.getElementById("date").value === null;
        setImgArr([]);
      }
    } catch (err) {
      console.log("ERROR: POST request in createPost: ", err);
    }    
  };

  return (
    <div className="createPost">
      <Gallery imgArr={imgArr} />
      <div className="createPostRoute">
        <div className="price">
          <div className="imageUpload">
            <input
              type={"file"}
              multiple
              onChange={(e) => setImageUpload(e.target.files[0])}
            ></input>
            <button type="submit" onClick={firebaseUploadImage}>
              Upload Image
            </button>
          </div>
          <h2>Move In Date *</h2>
          <input type={"date"} id="date"></input>
          <h2>List Price *</h2>
          <div className="cost">
            <h3 id="rentTag">Rent *</h3>
            <input type={"number"} id="rent"></input>
            <h3 id="utilitiesTag">Utilities *</h3>
            <input type={"number"} id="utilities"></input>
          </div>
          <div className="preference">
            <h3 id="genderTag">Gender Preference *</h3>
            <select name="genders" id="dropDownMenu">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="no-preference">No-preference</option>
            </select>
          </div>
        </div>
        <div className="house">
          <h2>Listing Address</h2>

          <h3 id="addressTag">Address *</h3>
          <div className="address">
            <input
              type={"text"}
              id="street1"
              placeholder="Street address or P.O. Box"
            ></input>
            <input
              type={"text"}
              id="street2"
              placeholder="Apt, suite, unit, building, floor, etc"
            ></input>
          </div>

          <h5 id="cityTag">City *</h5>
          <input type={"text"} id="city"></input>

          <h5 id="stateTag">State *</h5>
          <input type={"text"} id="state"></input>

          <h5 id="zipTag">Zip Code *</h5>
          <input type={"text"} id="zipCode"></input>
        </div>

        <div className="description">
          <h3 id="DescriptionTag">Description </h3>
          <div className="basic">
            <div>
              <h5 id="bedroomTag">Bedrooms *</h5>
              <input type={"number"} id="bedroom"></input>
            </div>
            <div>
              <h5 id="bathroomTag">Bathrooms *</h5>
              <input type={"number"} id="bathroom"></input>
            </div>
            <div>
              <h5 id="sqftTag">Sqft *</h5>
              <input type={"number"} id="sqft"></input>
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
          <input type={"text"} id="condition"></input>
        </div>
        <div className="bio">
          <h3 id="bioTag">Bio</h3>
          <input type={"text"} id="bio"></input>
          <button type="submit" id="submitPost" onClick={createPostSubmissions}>
            <h2>Post</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

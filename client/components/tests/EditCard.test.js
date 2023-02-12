import React from "react";

import { screen, fireEvent } from "@testing-library/react";

import mockContext from "./__mocks__/mockContext.js";
import EditCard from "../EditCard.jsx";

jest.mock('../ImageGallery.jsx', () => {
  return () => <div data-testid="ImageGallery" /> 
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com'
}

const postInfo = {
  address: {
    street1: 'Street 1',
    street2: 'Street 2',
    city: 'City',
    state: 'State',
    zipCode: '12345'
  },
  roommate: {gender: 'male'},
  description: {
    BR: 1,
    BA: 1,
    sqFt: 100,
    parking: true,
    smoking: true,
    pets: true
  },
  moveInDate: Date.now(),
  rent: 100,
  bio: 'Description',
  images: {
    imgUrl: '',
    imgPath: ''
  },
  currUser: {
    firstName: 'John',
    lastName: 'Smith',
    username: 'test@gmail.com'
  }
}

const getProfilePosts = () => {
  return Promise.resolve()
}

describe("EditCard.jsx", () => {
  let originalFetch;
  let providerProps;
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(false)
    }));
    providerProps = {
      userInfo: userInfo
    }
  });

  xit("Renders EditCard component", async () => {    
    mockContext(<EditCard postInfo={postInfo} getProfilePosts={getProfilePosts}/>, { providerProps })

    expect(await screen.getByText("Upload Image")).toBeTruthy();
    expect(await screen.getByText("Remove Image")).toBeTruthy();

  });

  xit("Populates values in state", async () => {    
    mockContext(<EditCard postInfo={postInfo} getProfilePosts={getProfilePosts}/>, { providerProps })

    const cityInput = await screen.getByPlaceholderText('cityInput');

    fireEvent.change(cityInput, { target: { value: 'New York' } });
  
    expect(cityInput.value).toBe('New York')
    
  });

});

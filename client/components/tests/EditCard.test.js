import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditCard from "../EditCard.jsx";

jest.mock('../ImageGallery.jsx', () => {
  return () => <div data-testid="ImageGallery" /> 
});

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

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(false)
    }));
  });

  xit("Renders EditCard component", async () => {    
    render( <EditCard postInfo={postInfo} getProfilePosts={getProfilePosts}/> );

    expect(await screen.getByText("Upload Image")).toBeTruthy();
    expect(await screen.getByText("Remove Image")).toBeTruthy();

  });

  xit("Populates values in state", async () => {    
    render(<EditCard postInfo={postInfo} getProfilePosts={getProfilePosts}/>);

    const cityInput = await screen.getByPlaceholderText('cityInput');

    fireEvent.change(cityInput, { target: { value: 'New York' } });
  
    expect(cityInput.value).toBe('New York')
    
  });

});

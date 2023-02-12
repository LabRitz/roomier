import React from "react";

import { screen } from "@testing-library/react";

import mockContext from "./__mocks__/mockContext.js";
import ProfileFeed from "../ProfileFeed.jsx";

jest.mock('../ContainerApplication.jsx', () => {
  return () => <div data-testid="ContainerApplication" /> 
});

jest.mock('../ImageGallery.jsx', () => {
  return () => <div data-testid="ImageGallery" /> 
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com'
}

const posts = [{
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
}]

describe("ProfileFeed.jsx", () => {

  let providerProps;
  beforeEach(() => {
    providerProps = {
      userInfo: userInfo
    }
  });

  it("Renders ProfileFeed component", async () => {    
    mockContext(<ProfileFeed posts={posts}/>, { providerProps })

    expect(await screen.getByTestId('ContainerApplication')).toBeTruthy();
  });
 
});